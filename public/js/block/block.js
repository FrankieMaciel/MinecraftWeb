import { getTexture } from "./textures";

// Size of a block in pixels
const blockSize = 50;

class block {
  constructor(
    world,
    name,
    id,
    material,
    x,
    y
  ) {
    this.world = world;
    this.name = name;
    this.id = id;
    this.material = material;
    this.x = x;
    this.y = y;

    this.block;
  }

  breakSelf() {
    this.block.remove();
  }

  create() {
    let block = document.createElement('div');
    block.classList.add('block');

    block.style.width = `${blockSize}px`;
    block.style.height = `${blockSize}px`;

    block.style.backgroundImage = `url('../img/${getTexture(this.id)})`; 
    block.style.backgroundSize = "contain";

    block.style.left = `calc(${this.x * blockSize}px + var(--camera-x))`;
    block.style.bottom = `calc(${this.y}px + var(--camera-y))`;

    block.addEventListener('click', () => {
      breakSelf();
    });

    this.block = block;
    this.world.appendChild(block);
  }
}

export default block;