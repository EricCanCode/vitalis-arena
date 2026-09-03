/* modules/playerProxy.js
 * Lightweight proxy to expose `player` accessors for gradual extraction.
 */
(function(){
  'use strict';

  function getPlayer(){
    return (window.game && window.game.player) ? window.game.player : null;
  }

  function get(field){
    const p = getPlayer();
    return p ? p[field] : undefined;
  }

  function set(field, value){
    const p = getPlayer();
    if (p) p[field] = value;
  }

  const PlayerProxy = { getPlayer, get, set };

  if (typeof window !== 'undefined') window.PlayerProxy = PlayerProxy;
  if (typeof module !== 'undefined' && module.exports) module.exports = PlayerProxy;

})();
