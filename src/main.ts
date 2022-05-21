import {Hand} from './game/gameObjects/hand';
import {Minimap} from './game/gameObjects/minimap';

const HAND = Hand.getInstance();
const MINIMAP = Minimap.getInstance();
const TICK = 20;

let lastRender = 0;

// start game loop
window.requestAnimationFrame(loop);

HAND.getHandCount().subscribe(v => {
  console.log(v);
});

function update(progress: number) {
  MINIMAP.setMapStatus(MINIMAP.updatePopulationModel(progress));
}

function draw() {
  HAND.drawCounter();
  MINIMAP.drawMinimap();
}

function loop(timestamp: number) {
  const progress = timestamp - lastRender;

  setTimeout(() => {
    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }, 1000 / TICK);
}
