/* modules/playerFactory.js
 * Provides `window.PlayerFactory` used by game startup to instantiate players.
 * Initially delegates to the in-file `Player` class; later this module
 * can replace Player with a refactored implementation.
 */
(function(){
  'use strict';

  function defaultFactory(x,y,type,game){
    // If the global Player class exists, use it; otherwise throw
    if (typeof Player === 'function') return new Player(x,y,type,game);
    throw new Error('Player class not available');
  }

  if (typeof window !== 'undefined') {
    window.PlayerFactory = window.PlayerFactory || defaultFactory;
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { PlayerFactory: defaultFactory };
})();
