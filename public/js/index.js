let space = document.getElementById('space');
const zone1 = document.getElementById('zone1');
const zone2 = document.getElementById('zone2');
let blockSize = 50;

let worldSize = 30;
let worldDeep = 10;
let worldBaseY = 50;

let selfDestroy = (block) => {
  block.remove();
}

let createBlock = (x, world) => {

    let block = document.createElement('div');
    block.classList.add('cube');

    block.style.backgroundImage = "url('../img/grassblock.png')"; 
    block.style.backgroundSize = "contain";
    // block;style.backgroundRepeat = " no-repeat";

    block.style.width = `${blockSize}px`;
    block.style.height = `${blockSize}px`;
    block.style.left = `calc(${x * blockSize}px + var(--camera-x))`;

    block.addEventListener('click', () => {
      selfDestroy(block);
    });

    let y = parseInt(perlin.get(x / 20, x / 20) * 10);
    console.log(y);

    let alturayFormula = (y * blockSize) + worldDeep * 20;

    block.style.bottom = `calc(${alturayFormula}px + var(--camera-y))`;

    world.appendChild(block);

    generateUnderGroundBlocks(x, alturayFormula, world);
}

let createGeneralBlock = (x, y, world) => {

  let block = document.createElement('div');
  block.classList.add('cube');

  block.style.backgroundImage = "url('../img/dirtblock.jpg')"; 
  block.style.backgroundSize = "contain";
  // block;style.backgroundRepeat = " no-repeat";

  block.style.width = `${blockSize}px`;
  block.style.height = `${blockSize}px`;
  block.style.left = `calc(${x * blockSize}px + var(--camera-x))`;

  block.addEventListener('click', () => {
    selfDestroy(block);
  });

  // let y = parseInt(perlin.get(x / 10, x / 10) * 10);
  // console.log(y);
  block.style.bottom = `calc(${y}px + var(--camera-y))`;

  world.appendChild(block);
}

let generateUnderGroundBlocks = (x, Yinit, element) => {
  for (let y = 1; y < worldDeep; y++) {
    createGeneralBlock(x, Yinit - (y * blockSize), element);
  }
}

let generateWorld = () => {
    perlin.seed()
    for (let x = 0; x < worldSize; x++) {
        createBlock(x, zone1);
    }
    perlin.seed()
    for (let x = 0; x < worldSize; x++) {
        createBlock(x, zone2);
    }
}

generateWorld();

document.addEventListener('keydown', function(event) {
  const key = event.key; // "a", "1", "Shift", etc.
  moveWorld(key);
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