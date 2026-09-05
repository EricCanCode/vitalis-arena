#!/usr/bin/env python3
"""
spritefix.py — turn a Midjourney sprite into a game-ready one.

Midjourney does not produce pixel art. It produces a painted picture OF pixel
art: the cell grid drifts, the outline changes weight, and a "three tone" red
arrives as ninety reds with speckle. Dropped into the game next to the existing
hand-made sprites, the difference is obvious.

This does the four things that close that gap:

    1. Cuts the background by flooding in from the edges, NOT by deleting
       everything white. That distinction matters — the demon has white teeth,
       and a naive white-to-alpha pass eats them.
    2. Quantises to a small palette, which is what collapses the speckle into
       the flat bands the existing art uses.
    3. Snaps to a real grid by taking the MOST COMMON colour in each cell
       rather than the average. Averaging invents colours that were never in
       the palette and is the reason naive downscaling looks muddy.
    4. Scales back up by a whole number only. Fractional scaling is what
       produces half-pixels and soft edges.

Usage:
    python3 tools/spritefix.py in.png out.png
    python3 tools/spritefix.py in.png out.png --grid 48 --colors 12 --size 512

Defaults are tuned for this game: a 48-cell logical sprite, 12 colours, output
at 512px so there is headroom above the 182px SPRITE_SOURCE_SIZE for Retina.
"""

import argparse
import sys
from collections import Counter, deque

try:
    from PIL import Image, ImageFilter
except ImportError:
    sys.exit("Pillow is required:  pip install Pillow")


def strip_background(img, tolerance=32):
    """Flood transparency inward from the border.

    Only background that is actually CONNECTED to the edge is removed, so white
    pixels enclosed by the sprite — teeth, eye glints, highlights — survive.
    """
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()

    # The corner colour is the background by assumption; Midjourney honours
    # "plain white background" reliably enough for that to hold.
    bg = px[0, 0][:3]

    def matches(c):
        return all(abs(c[i] - bg[i]) <= tolerance for i in range(3))

    seen = bytearray(w * h)
    queue = deque()

    for x in range(w):
        for y in (0, h - 1):
            queue.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        i = y * w + x
        if seen[i]:
            continue
        seen[i] = 1
        if not matches(px[x, y][:3]):
            continue
        px[x, y] = (0, 0, 0, 0)
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    return img


def despeckle(img, radius):
    """Median-blur the colour channels before quantising.

    Modal downsampling PICKS a colour per cell, it does not average one, so a
    cell full of speckle yields a speckled cell — the noise just arrives at
    grid resolution instead of pixel resolution. A median pass first collapses
    Midjourney's per-pixel dither into the flat regions the mode can then read
    cleanly. Median rather than blur because it preserves the hard outline;
    a gaussian would soften exactly the edge this style depends on.
    """
    if radius < 1:
        return img
    size = radius * 2 + 1
    alpha = img.getchannel("A")
    rgb = img.convert("RGB").filter(ImageFilter.MedianFilter(size=size))
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out


def quantise(img, colors):
    """Reduce to a small palette, dithering OFF.

    Dithering scatters pixels to fake intermediate tones, which is the exact
    opposite of the flat banding this art style depends on.

    The transparent region has to be neutralised first. RGBA->RGB turns every
    transparent pixel black, and on a cropped sprite that is a huge cluster of
    pure black sitting far from every real colour — median cut hands it palette
    slots, and small-but-distinct features lose theirs. Measured on the test
    sprite: white teeth (1.6% of pixels) were merged into red and vanished
    completely. Filling the background with the sprite's own dominant colour
    costs nothing, since alpha is restored afterwards.
    """
    alpha = img.getchannel("A")
    rgb = img.convert("RGB")

    opaque = [p[:3] for p in img.getdata() if p[3] >= 128]
    if opaque:
        fill = Counter(opaque).most_common(1)[0][0]
        hole = alpha.point(lambda a: 255 if a < 128 else 0)
        rgb.paste(Image.new("RGB", rgb.size, fill), mask=hole)

    q = rgb.quantize(colors=colors, method=Image.MEDIANCUT, dither=Image.NONE)
    out = q.convert("RGB").convert("RGBA")
    out.putalpha(alpha)
    return out


def snap_to_grid(img, grid):
    """Downsample by modal colour per cell, preserving the longest edge."""
    w, h = img.size
    long_edge = max(w, h)
    cell = max(1, round(long_edge / grid))

    out_w = max(1, round(w / cell))
    out_h = max(1, round(h / cell))
    src = img.load()

    out = Image.new("RGBA", (out_w, out_h), (0, 0, 0, 0))
    dst = out.load()

    for oy in range(out_h):
        for ox in range(out_w):
            counts = Counter()
            clear = 0
            total = 0
            for y in range(oy * cell, min((oy + 1) * cell, h)):
                for x in range(ox * cell, min((ox + 1) * cell, w)):
                    p = src[x, y]
                    total += 1
                    if p[3] < 128:
                        clear += 1
                    else:
                        counts[p[:3]] += 1
            # A cell that is mostly background stays background, so the
            # silhouette keeps a hard edge instead of a halo.
            if total and clear * 2 > total:
                dst[ox, oy] = (0, 0, 0, 0)
            elif counts:
                dst[ox, oy] = counts.most_common(1)[0][0] + (255,)

    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--grid", type=int, default=48,
                    help="logical sprite size in cells (default 48)")
    ap.add_argument("--colors", type=int, default=12,
                    help="palette size (default 12)")
    ap.add_argument("--size", type=int, default=512,
                    help="output size in px (default 512)")
    ap.add_argument("--smooth", type=int, default=3,
                    help="median filter radius before quantising (0 disables)")
    ap.add_argument("--tolerance", type=int, default=32,
                    help="background colour match tolerance (default 32)")
    ap.add_argument("--keep-bg", action="store_true",
                    help="skip background removal")
    args = ap.parse_args()

    img = Image.open(args.src).convert("RGBA")
    before = len(set(img.convert("RGB").getdata()))

    if not args.keep_bg:
        img = strip_background(img, args.tolerance)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img = despeckle(img, args.smooth)
    img = quantise(img, args.colors)
    img = snap_to_grid(img, args.grid)
    logical = img.size

    # Whole-number scale only; anything else reintroduces soft edges.
    factor = max(1, args.size // max(img.size))
    img = img.resize((img.width * factor, img.height * factor), Image.NEAREST)

    # Centre on a square canvas so every sprite shares one origin.
    side = max(img.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - img.width) // 2, (side - img.height) // 2))
    canvas.save(args.dst)

    after = len({p[:3] for p in canvas.getdata() if p[3] > 0})
    print(f"{args.src} -> {args.dst}")
    print(f"  colours   {before} -> {after}")
    print(f"  logical   {logical[0]}x{logical[1]} cells, scaled {factor}x")
    print(f"  output    {canvas.width}x{canvas.height}, transparent background")


if __name__ == "__main__":
    main()
