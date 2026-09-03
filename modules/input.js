// Simple input helpers to support progressive modularization
(function(window){
    window.InputModule = {
        buildReverseKeyMap(bindings) {
            const defaults = { moveUp: 'w', moveLeft: 'a', moveDown: 's', moveRight: 'd', ultimate: 'q' };
            const reverse = {};
            try {
                const merged = Object.assign({}, defaults, bindings || {});
                for (const action in merged) {
                    const key = (merged[action] || '').toLowerCase();
                    if (key) reverse[key] = defaults[action] || action;
                }
            } catch (e) {}
            // arrow keys fallback
            if (!reverse['arrowup']) reverse['arrowup'] = 'w';
            if (!reverse['arrowleft']) reverse['arrowleft'] = 'a';
            if (!reverse['arrowdown']) reverse['arrowdown'] = 's';
            if (!reverse['arrowright']) reverse['arrowright'] = 'd';
            return reverse;
        },
        applyBindingsToGame(game, bindings) {
            if (!game) return;
            game.keyBindings = Object.assign({}, bindings || {});
            if (game._buildReverseKeyMap) game._buildReverseKeyMap();
        }
    };
})(window);
