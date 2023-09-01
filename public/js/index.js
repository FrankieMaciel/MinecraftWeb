import config from './config.js';

let ctx = config.ctx;

ctx.canvas.width  = config.winWidth;
ctx.canvas.height = config.winHeigth;

import Player from './player/player.js';
import World from './world/world.js';

let newWorld = new World('NewWorld');
let newPlayer = new Player(newWorld);

newWorld.render(newPlayer.camera);

const keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.key.toLowerCase()] = event.key.toLowerCase();
  // if (!event.repeat)
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key.toLowerCase()];
  // if (!event.repeat)
});

function hexToRGB(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function calculateWeightedMidColor(color1, color2, weight1, weight2) {
  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);

  const midR = Math.floor((rgb1.r * weight1 + rgb2.r * weight2) / (weight1 + weight2));
  const midG = Math.floor((rgb1.g * weight1 + rgb2.g * weight2) / (weight1 + weight2));
  const midB = Math.floor((rgb1.b * weight1 + rgb2.b * weight2) / (weight1 + weight2));

  const midColorHex = `#${midR.toString(16).padStart(2, "0")}${midG.toString(16).padStart(2, "0")}${midB.toString(16).padStart(2, "0")}`;

  return midColorHex;
}

function calculatePercentage(number, max) {
  if (number < 0 || max <= 0) {
    throw new Error("O número e o máximo devem ser valores positivos maiores que zero.");
  }

  const percentage = (number / max) * 100;
  return percentage;
}

function renderSky(playerCamera) {

  // if (((playerCamera.y * config.blockSize) + (config.winHeigth / 2)) > (config.WorldMaxHeight / 2)) {
  let color1 = '#121517';
  let color2 = '#1e2224';

  let color3 = '#e4eef2';
  let color4 = '#a9ddf5';

  let camPosY = (playerCamera.y - config.WorldMaxHeight);
  
  if (camPosY < 0) camPosY = 1;
  if (camPosY > config.WorldMaxHeight) camPosY = config.WorldMaxHeight;

  let percentage = calculatePercentage(camPosY, config.WorldMaxHeight);

  const weight1 = percentage; // Peso para a cor 1
  const weight2 = 100 - percentage; // Peso para a cor 2

  const midColor1 = calculateWeightedMidColor(color1, color3, weight1, weight2);
  const midColor2 = calculateWeightedMidColor(color2, color4, weight1, weight2);

  // Create gradient
  const grd = ctx.createLinearGradient(0, 500, 0, 0);
  grd.addColorStop(0, midColor1);
  grd.addColorStop(1, midColor2);

   // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, config.winWidth, config.winHeigth);
}

function updateFrame() {
  // Render the sky
  renderSky(newPlayer.camera);
  // Render the world
  newWorld.render(newPlayer.camera);
  
  // Calculate Player moviment
  newPlayer.onKeyDown(keysPressed);
  newPlayer.gravity();

  //Render the player
  newPlayer.render();

  setTimeout(() => {
    requestAnimationFrame(updateFrame);
  }, 1/60);
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