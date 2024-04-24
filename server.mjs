/** Import of the incredible functions of ALTV */
import * as alt from 'alt';

/**
 * On Client : Set player visibility
 */
 alt.onClient('seln:cctv:visibility', (player, bool) => {

    player.visible = bool;

});

