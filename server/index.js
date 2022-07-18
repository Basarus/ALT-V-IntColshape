import alt, { ColshapeCylinder } from 'alt-server';

let house = {
    enter: { x: -1896.4879150390625, y: 642.3428344726562, z: 130.193359375 },
    exit: { x: -1456.826416015625, y: -534.1450805664062, z: 74.032958984375, rot: 0.6431607604026794 }
};

alt.on('playerConnect', player => {
    player.spawn(...Object.values(house.enter));
    player.model = 'mp_m_freemode_01';
    player.setSyncedMeta('dimension', 0);
    alt.emitClient(player, 'drawMarker', {x: -1896.4879150390625, y: 642.3428344726562, z: 130.193359375 })
    alt.emitClient(player, 'drawMarker', { x: -1456.826416015625, y: -534.1450805664062, z: 74.032958984375 }, 1)
});

createIntColshape()

function createIntColshape() {
    let enter = new ColshapeCylinder(house.enter.x, house.enter.y, house.enter.z, 2, 2);
    let exit = new ColshapeCylinder(house.exit.x, house.exit.y, house.exit.z, 2, 2);
    exit.dimension = 1;
    enter.setMeta('id', {key: 'autobus', id: 1, type: 'enter'})
    exit.setMeta('id', {id: 1, type: 'exit'})
}

alt.on('entityEnterColshape', (colshape, entity) => {
   entity.intColshape = colshape.getMeta('id')
})

alt.on('entityLeaveColshape', (colshape, entity) => {
   entity.intColshape = undefined;
})

alt.onClient('server::player:pressE', (player) => {
    if (player.intColshape){
        let {id, type} = player.intColshape;
        alt.emitClient(player, 'client:loader:init', 4)
        if (type == 'enter'){
            setTimeout(() => {
                player.spawn(house.exit.x, house.exit.y, house.exit.z);
                player.rot = {x: 0, y: 0, z: house.exit.rot}
                player.dimension = id;
                player.setSyncedMeta('dimension', 1);
            }, 1000)
        } else if (type == 'exit'){
            setTimeout(() => {
            player.spawn(house.enter.x, house.enter.y, house.enter.z);
            player.dimension = 0;
            player.setSyncedMeta('dimension', 0);
            }, 1000)
        }
    }
})