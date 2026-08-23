// Camera.js — the single bridge between world space and screen space.
//
// Every world entity draws at absolute world coordinates. render() applies one
// translate before drawing them, so nothing else in the game needs to know the
// camera exists. UI drawn AFTER the transform is restored stays screen-space.
//
// When the world is the same size as the viewport the camera clamps to (0, 0)
// and is mathematically identity — that is the classic fixed arena, unchanged.

class Camera {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.smoothing = GAME_CONFIG.world.cameraSmoothing;
    }

    get viewWidth() { return this.game.canvas.width; }
    get viewHeight() { return this.game.canvas.height; }

    // The top-left corner needed to centre `focus`, clamped so the view never
    // shows anything outside the world. A world smaller than the viewport is
    // centred instead of clamped, which keeps it stable rather than jammed.
    solve(focusX, focusY) {
        const world = this.game.world;
        const vw = this.viewWidth;
        const vh = this.viewHeight;

        let x, y;

        if (world.width <= vw) x = (world.width - vw) / 2;
        else x = Math.max(0, Math.min(world.width - vw, focusX - vw / 2));

        if (world.height <= vh) y = (world.height - vh) / 2;
        else y = Math.max(0, Math.min(world.height - vh, focusY - vh / 2));

        return { x, y };
    }

    // Jump straight to the target — used at run start so the camera does not
    // glide in from the origin on the first frame.
    snapTo(focusX, focusY) {
        const t = this.solve(focusX, focusY);
        this.x = t.x;
        this.y = t.y;
    }

    update(deltaTime, focusX, focusY) {
        const t = this.solve(focusX, focusY);
        // Exponential smoothing: frame-rate independent, unlike a flat lerp,
        // so the follow feels the same at 30fps and 60fps.
        const k = 1 - Math.exp(-this.smoothing * deltaTime);
        this.x += (t.x - this.x) * k;
        this.y += (t.y - this.y) * k;
    }

    worldToScreen(x, y) { return { x: x - this.x, y: y - this.y }; }
    screenToWorld(x, y) { return { x: x + this.x, y: y + this.y }; }

    // Is this world point outside the visible view by more than `margin`?
    isOffscreen(x, y, margin = 0) {
        return x < this.x - margin ||
               x > this.x + this.viewWidth + margin ||
               y < this.y - margin ||
               y > this.y + this.viewHeight + margin;
    }

    // The visible world rectangle.
    getBounds() {
        return {
            left: this.x,
            top: this.y,
            right: this.x + this.viewWidth,
            bottom: this.y + this.viewHeight
        };
    }
}
