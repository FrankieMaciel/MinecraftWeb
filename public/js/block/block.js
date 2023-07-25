import { getTexture } from "./textures.js";

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

  breakSelf(block) {
    block.remove();
  }

  create() {
    let block = document.createElement('div');
    this.block = block;

    block.classList.add('block');

    block.style.width = `${blockSize}px`;
    block.style.height = `${blockSize}px`;

    block.style.backgroundImage = `url('/img/${getTexture(this.id)}`; 
    block.style.backgroundSize = "contain";

    block.style.left = `calc(${this.x * blockSize}px + var(--camera-x))`;
    block.style.bottom = `calc(${this.y * blockSize}px + var(--camera-y))`;

    block.addEventListener('click', () => {
      this.breakSelf(this.block);
    });

    this.world.appendChild(this.block);
  }
}

export default block;