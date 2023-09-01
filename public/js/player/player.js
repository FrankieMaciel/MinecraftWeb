import Camera from './camera.js';
import config from '../config.js';

let ctx = config.ctx;

export default class Player {
  keybinds = {
    'a': () => {
      this.nextX -= this.speed;
    },
    's': () => {
      this.nextY += this.jumpEnergy;
    },
    'w': () => {
      this.nextY -= this.jumpEnergy;
    },
    'd': () => {
      this.nextX += this.speed;
    },
    'q': () => {
      this.enableGravity = !this.enableGravity;
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

  constructor(world) {
    this.x = 0;
    this.y = 0;

    this.nextX = this.x;
    this.nextY = this.y;
    
    this.ChunkX = 0;
    this.ChunkY = 0;
    this.Xblock = 0;
    this.Yblock = 0;
    
    this.SizeX = 24 * 2;
    this.SizeY = 24 * 3;

    this.speed = config.movementAmount;
    this.jumpEnergy = 1;
    this.VelocityY = 0;
    this.enableGravity = true;

    this.hasCollide = false;

    this.camera = new Camera();
    this.world = world;
    this.hitbox = [];

    this.RenderDistanceY = config.RenderDistanceY;
    this.RenderDistanceX = config.RenderDistanceX;

    this.calculateHitbox();
  }

  calculatePlayerInfo() {
    this.ChunkX = Math.floor(this.x / config.ChunkSizeX) * config.ChunkSizeX;
    this.ChunkY = Math.floor(this.y / config.ChunkSizeY) * config.ChunkSizeY;
    this.Xblock = Math.floor((this.x / config.blockSize) * config.blockSize) - this.ChunkX;
    this.Yblock = Math.floor((this.y / config.blockSize) * config.blockSize) - this.ChunkY;
  }

  renderInfo() {
    let blockAt = 'None';
    let block = this.world.getBlockAt(this.x, this.y);
    if (block) blockAt = block.blockId;

    let info = `x:${this.x} y:${this.y} | blockId: ${blockAt}`;

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
    this.checkColision();
  }

  checkColision() {
    this.hasCollide = false;
    for (let box of this.hitbox) {
      let hitX = this.nextX + box.x;
      let hitY = this.nextY + box.y;

      let block = this.world.getBlockAt(hitX, hitY);
      if (!block) continue;
      if (block.blockId !== 'game:air') {
        this.hasCollide = true;
        break;
      } 
    }
    if (!this.hasCollide)  {
      this.x = this.nextX;
      this.y = this.nextY;
    } else {
      this.nextX = this.x;
      this.nextY = this.y;
    }
  }

  gravity() {
    // if (!this.hasCollide) this.VelocityY += 1;
    // if (this.hasCollide) this.VelocityY = 0;
    // if (this.VelocityY > 2) this.VelocityY = 2;
    if (this.enableGravity) {
      this.nextY += 1;
      // this.jumpEnergy = this.jumpEnergy / 2;
      this.checkColision();
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

    this.renderInfo();
  }
}
