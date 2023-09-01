import Camera from './camera.js';
import config from '../config.js';

let ctx = config.ctx;

export default class Player {
  keybinds = {
    'a': () => {
      this.x -= this.speed;
      if (!this.canGoLeft) this.x += this.speed;
    },
    's': () => {
      this.y += this.speed;
      if (!this.canGoDown) this.y -= this.speed;
    },
    'w': () => {
      this.y -= this.speed;
      if (!this.canGoUp) this.y += this.speed;
    },
    'd': () => {
      this.x += this.speed;
      if (!this.canGoRight) this.x -= this.speed;
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
    this.y = 80;
    
    this.ChunkX = 0;
    this.ChunkY = 0;
    this.Xblock = 0;
    this.Yblock = 0;
    
    this.SizeX = 24 * 2;
    this.SizeY = 24 * 3;

    this.canGoUp = true;
    this.canGoDown = true;
    this.canGoLeft = true;
    this.canGoRight = true;

    this.speed = config.movementAmount;

    this.camera = new Camera();
    this.hitbox = [];

    this.RenderDistanceY = config.RenderDistanceY;
    this.RenderDistanceX = config.RenderDistanceX;

    this.calculateHitbox()
  }

  calculatePlayerInfo() {
    this.ChunkX = Math.floor(this.x / config.ChunkSizeX) * config.ChunkSizeX;
    this.ChunkY = Math.floor(this.y / config.ChunkSizeY) * config.ChunkSizeY;
    this.Xblock = Math.floor((this.x / config.blockSize) * config.blockSize) - this.ChunkX;
    this.Yblock = Math.floor((this.y / config.blockSize) * config.blockSize) - this.ChunkY;
  }

  renderInfo() {

    let info = `x:${this.x} y:${this.y}`

    ctx.font = "16px monospace";
    ctx.fillStyle = "white";
    ctx.fillText(info, config.blockSize / 2, config.blockSize);
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

  checkColision(world) {

    // console.log('chunkx: ' + this.ChunkX + ' | chunky: ' + this.ChunkY);
    let chunk = world.chunks.get(`${this.ChunkX} ${this.ChunkY}`);
    // console.log(chunk);
    if (!chunk) return;
    
    for (let box of this.hitbox) {

      let blockX = (this.Xblock) * config.ChunkSizeX;
      let blockY = (this.Yblock) * config.ChunkSizeY;

      // console.log('blockY: ' + blockY + ' | blockY: ' + blockY);

      let block = chunk.blocks.get(`${blockX} ${blockY}`);
      // console.log(block);
      if (!block) return;
      // console.log(block);
      let isAir = block.blockId === 'game:air';

      this.MoveDirection(blockX, blockY, block.size, isAir);
    }
  }

  resetColision() {

    // console.log('down ' + this.canGoDown);
    // console.log('up ' + this.canGoUp);
    // console.log('left ' + this.canGoLeft);
    // console.log('rigth ' + this.canGoRight);

    this.canGoUp = true;
    this.canGoDown = true;
    this.canGoLeft = true;
    this.canGoRight = true;
  }

  MoveDirection(blockX, blockY, blockSize, isAir) {
    const margem = 0;
    if (
        this.x + this.SizeX >= blockX - margem &&
        this.x <= blockX + blockSize + margem &&
        this.y + this.SizeY >= blockY - margem &&
        this.y <= blockY + blockSize + margem
    ) {
        if (isAir) return;
        this.canGoUp = this.y + this.SizeY >= blockY && this.y <= blockY;
        this.canGoDown = this.y <= blockY + blockSize && this.y + this.SizeY >= blockY + blockSize;
        this.canGoLeft = this.x + this.SizeX >= blockX && this.x <= blockX;
        this.canGoRight = this.x <= blockX + blockSize && this.x + this.SizeX >= blockX + blockSize;
    }  
  }

  calculateHitbox() {

    let numBlocksX = Math.floor(this.SizeX / config.blockSize);
    let numBlocksY = Math.floor(this.SizeY / config.blockSize);

    for (let x = 0; x < numBlocksX; x++) {
      for (let y = 0; y < numBlocksY; y++) {

        let isXok = x != 0 && x != numBlocksX - 1;
        let isYok = y != 0 && y != numBlocksY - 1;

        if (isXok && isYok) continue;

        this.hitbox.push({x: x, y: y});
      }
    }

  }

  render() {

    this.calculatePlayerInfo();

    ctx.fillStyle = "#000000";

    let camMoveX = (this.x - this.camera.x).toFixed(0) / 12;
    let camMoveY = (this.y - this.camera.y).toFixed(0) / 12;

    this.camera.x += camMoveX;
    this.camera.y += camMoveY;

    let screenCenterX = (config.winWidth / config.blockSize) / 2;
    let screenCenterY = (config.winHeigth / config.blockSize) / 2;

    let posX = (this.x - (this.camera.x - screenCenterX)) * config.blockSize;
    let posY = (this.y - (this.camera.y - screenCenterY)) * config.blockSize;

    ctx.fillRect(posX - camMoveX, posY - camMoveX, this.SizeX, this.SizeY);

    this.resetColision();
    this.renderInfo();
  }
}
