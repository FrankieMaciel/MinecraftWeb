let space = document.getElementById('space');
// const ctx = canvas.getContext("2d");

const zone1 = document.getElementById('zone1');
const zone2 = document.getElementById('zone2');

import player from './player/player.js';
let jogador = new player;
jogador.walkFoward();

import world from './world/world.js';

let w = new world('teste', '123', space);
w.generateWorld();

let inventory = document.createElement('div');
inventory.style.width = `${30}rem`;
inventory.style.height = `${30}rem`;
inventory.style.position = 'absolute';
inventory.style.zIndex = '10';

inventory.style.backgroundImage = `url('/img/inventory.png')`; 
inventory.style.backgroundSize = "contain";
inventory.style.backgroundRepeat = 'no-repeat';
inventory.style.display = "none";
inventory.style.justifyContent = 'center';

let invDiv = document.getElementById('inventory');
invDiv.style.width = '100%';
invDiv.style.height = '100%';
invDiv.style.justifyContent = 'center';
invDiv.style.alignItems = 'center';
invDiv.style.display = 'flex';
invDiv.style.zIndex = '10';

invDiv.appendChild(inventory);

let inventoryIsOpen = false;

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (!inventoryIsOpen) {
    moveWorld(key);
  }

  if (key === 'e') {
    if (inventory.style.display === "none") {
      inventory.style.display = "block";
      inventoryIsOpen = true;
    } else {
      inventory.style.display = "none";
      inventoryIsOpen = false;
    }
  }
});


let cX = 0;
let cY = -600;
let moveWorld = (key) => {

  let speed = 15;
  let style = space.style;

  if (key === 'w') {
    cY -= speed; 
  }

  if (key === 's') {
    cY += speed; 
  }

  if (key === 'a') {
    cX += speed;
  }

  if (key === 'd') {
    cX -= speed;
  }

  space.style.setProperty('--camera-x', `${cX}px`);
  space.style.setProperty('--camera-y', `${cY}px`);
}