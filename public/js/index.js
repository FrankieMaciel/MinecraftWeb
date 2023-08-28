import config from './config.js';

let ctx = config.ctx;

ctx.canvas.width  = config.winWidth;
ctx.canvas.height = config.winHeigth;

import Player from './player/player.js';
import World from './world/world.js';

let newPlayer = new Player();
let newWorld = new World('NewWorld', newPlayer);

newWorld.render(newPlayer.camera);

const keysPressed = {};

document.addEventListener('keydown', (event) => {
  if (!event.repeat)
    keysPressed[event.key] = event.key;
});

document.addEventListener('keyup', (event) => {
  if (!event.repeat)
    delete keysPressed[event.key];
});

function updateFrame() {
  for (let key in keysPressed) {
    newPlayer.onKeyDown(keysPressed[key]);
  }
  newWorld.render(newPlayer.camera);
  requestAnimationFrame(updateFrame);
}

updateFrame();

function resize() {
  config.winWidth = window.innerWidth;
  config.winHeigth = window.innerHeight;
  ctx.canvas.width  = config.winWidth;
  ctx.canvas.height = config.winHeigth;
  updateFrame();
}

window.addEventListener('resize', () => {
  resize();
})