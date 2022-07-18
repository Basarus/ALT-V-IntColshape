/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import * as native from 'natives';

alt.on('keyup', (key) => {
    if (key == 69) alt.emitServer('server::player:pressE') 
})

let dimension = null;

alt.onServer('drawMarker', (coords, _dimension = 0) => {
    setInterval(() => {
        dimension = _dimension
        if (dimension != alt.Player.local.getSyncedMeta('dimension')) return;
        let marker = native.drawMarker(
            27,
            coords.x,
            coords.y,
            coords.z - 0.8,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            255,
            255,
            255,
            255,
            false,
            false,
            2,
            true,
            undefined,
            undefined,
            false
        );
    }, 0)
});

alt.onServer('client:loader:init', initializeLoader);

let view;

function initializeLoader(timeout) {
    if (!view) {
        view = new alt.WebView('http://resource/client/systems/gm/houses/loader/index.html');
    } else {
        view.destroy()
        view = undefined;
    }
    if (timeout != undefined){
        setTimeout(() => {
            view.destroy()
            view = undefined;
        }, timeout * 1000)
    }
}