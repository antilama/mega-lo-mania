import {GAME_CONFIG} from './game/configuration/globalVars';
import {MAP_DEV} from './game/configuration/levels/dev';
import {GameState} from './game/game-state';
import {Hand} from './game/gameObjects/hand';
import {Minimap} from './game/gameObjects/minimap';

// gameVars
let lastRender = 0;

// gameObjects
const GAME_STATE = GameState.getInstance();
const HAND = Hand.getInstance();
const MINIMAP = Minimap.getInstance();

// load level
GAME_STATE.setMapState(MAP_DEV);

// start game loop
window.requestAnimationFrame(loop);

// HAND.getHandCount().subscribe(v => {
//   console.log(v);
// });

function update(progress: number) {
  GAME_STATE.updateMapModel(progress);
}

function draw() {
  HAND.drawCounter();
  MINIMAP.drawMinimap(GAME_STATE.mapState());
}

function loop(timestamp: number) {
  const progress = timestamp - lastRender;

  setTimeout(() => {
    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }, 1000 / GAME_CONFIG.tick);
}
