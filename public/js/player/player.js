import Camera from './camera.js';
import config from '../config.js';

let ctx = config.ctx;

export default class Player {
  keybinds = {
    'a': () => {
      this.x -= this.speed;
    },
    's': () => {
      this.y += this.speed;
    },
    'w': () => {
      this.y -= this.speed;
    },
    'd': () => {
      this.x += this.speed;
    },
  }

  priorityKeyBinds = {
    'shift': () => {
      this.speed = config.movementAmount / 2;
    },
    'c': () => {
      this.speed = config.movementAmount * 2;
    },
  }

  constructor() {
    this.x = 0;
    this.y = 0;
    
    this.ChunkX = 0;
    this.chunkY = 0;
    this.Xblock = 0;
    this.Yblock = 0;
    
    this.SizeX = 24 * 2;
    this.SizeY = 24 * 3;

    this.speed = config.movementAmount;

    this.camera = new Camera();
    this.hitbox = [];

    this.RenderDistanceY = config.RenderDistanceY;
    this.RenderDistanceX = config.RenderDistanceX;

    this.calculateHitbox()
  }

  calculatePlayerInfo() {
    this.ChunkX = (Math.floor((this.x) / config.ChunkSizeX) * config.ChunkSizeX);
    this.chunkY = (Math.floor(this.y / config.ChunkSizeY) * config.ChunkSizeY);
    this.Xblock = Math.floor((this.x - this.chunkX) / config.blockSize);
    this.Yblock = Math.floor((this.y - this.chunkY) / config.blockSize);
  }

  onKeyDown(keys) {
    this.speed = config.movementAmount;
    const actions = [];
    const pactions = [];
    for (let key in keys) {
      const action = this.keybinds[key];
      if (action) actions.push(action);
      const paction = this.priorityKeyBinds[key];
      if (paction) pactions.push(paction);
    }
    pactions.forEach((act) => act());
    actions.forEach((act) => act());
  }

  willToucth(world) {

    let chunk = world.chunks.get(`${this.ChunkX} ${this.chunkY}`);

    if (!chunk) return;

    let blocks = chunk.blocks;

    let left = false, rigth = false, up = false, down = false;

    for (let box of this.hitbox) {
      let x = this.ChunkX + this.Xblock + box.x;
      let y = this.chunkY + this.Yblock + box.y;
      
      if (box.x > 0) x += config.blockSize;
      else x -= config.blockSize;
      
      if (box.y > 0) y += config.blockSize;
      else y -= config.blockSize;
      
      let block = blocks.get(`${x} ${y}`);

      if (!block) continue;
      if (block.blockId !== 'game:air') continue;

      if (box.x > 0) rigth = true;
      else left = true;

      if (box.y > 0) down = true;
      else up = true;
    }
    return {
      left: left,
      rigth: rigth,
      up: up,
      down: down
    };
  }

  calculateHitbox() {

    let numBlocksX = Math.floor(this.SizeX / config.blockSize);
    let numBlocksY = Math.floor(this.SizeY / config.blockSize);

    for (let x = 0; x < numBlocksX; x++) {
      for (let y = 0; y < numBlocksY; y++) {

        let isXok = x != 0 && x != numBlocksX - 1;
        let isYok = y != 0 && y != numBlocksY - 1;

        if (isXok && isYok) continue;

        this.hitbox.push({x: x * config.blockSize, y: y * config.blockSize});
      }
    }

  }

  render() {

    this.calculatePlayerInfo();

    ctx.fillStyle = "#000000";

    let camMoveX = (this.x * config.ChunkSizeX - this.camera.x) / 100;
    let camMoveY = (this.y * config.ChunkSizeX - this.camera.y) / 100;
    
    this.camera.x += camMoveX;
    this.camera.y += camMoveY;

    let posX = (this.x * config.ChunkSizeX) - (this.camera.x - (config.winWidth / 2));
    let posY = (this.y * config.ChunkSizeY) - (this.camera.y - (config.winHeigth / 2));
    
    // Removendo as linhas posX -= camMoveX; e posY -= camMoveY;

    ctx.fillRect(posX - camMoveX, posY - camMoveX, this.SizeX, this.SizeY);
  }
}
