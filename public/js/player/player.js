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

    this.MouseX = 0;
    this.MouseY = 0;

    this.HoldingBlockId = "game:creative";

    this.speed = config.movementAmount;
    this.jumpEnergy = 1;
    this.VelocityY = 0;
    this.enableGravity = true;

    this.hasCollide = false;

    this.playerTexture = new Image();
    this.playerTexture.src = '/img/player.png';

    this.camera = new Camera();
    this.world = world;
    this.hitbox = [];

    this.RenderDistanceY = config.RenderDistanceY;
    this.RenderDistanceX = config.RenderDistanceX;

    this.calculateHitbox();
  }

  calculatePlayerInfo(mouseX, mouseY) {
    this.ChunkX = Math.floor(this.x / config.ChunkSizeX) * config.ChunkSizeX;
    this.ChunkY = Math.floor(this.y / config.ChunkSizeY) * config.ChunkSizeY;
    this.Xblock = Math.floor((this.x / config.blockSize) * config.blockSize) - this.ChunkX;
    this.Yblock = Math.floor((this.y / config.blockSize) * config.blockSize) - this.ChunkY;

    this.MouseX = Math.floor((this.camera.x - this.world.screenCenterX) + mouseX / config.blockSize);
    this.MouseY = Math.floor((this.camera.y - this.world.screenCenterY) + mouseY / config.blockSize);
  }

  renderInfo(fps) {
    let blockAt = 'None';
    let block = this.world.getBlockAt(this.MouseX, this.MouseY);
    if (block) blockAt = block.blockId;

    let info = `Fps: ${fps} | x:${this.x} y:${this.y} | blockId: ${blockAt} | MouseX ${this.MouseX} MouseY ${this.MouseY} | Seed: ${this.world.seed}`;

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
      if (block.blockId !== 'game:air' && block.isTangible) {
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

  breakBlock() {
    let block = this.world.getBlockAt(this.MouseX, this.MouseY);
    if (block.blockId === 'game:limit') return;
    this.world.setBlockAt(this.MouseX, this.MouseY, "game:air");
  }

  placeBlock(debugBlockColor) {
    let block = this.world.getBlockAt(this.MouseX, this.MouseY);
    if (block.blockId !== "game:air" && block.blockId !== "game:creative") return;
    this.world.setBlockAt(this.MouseX, this.MouseY, this.HoldingBlockId, debugBlockColor);
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

  render(fps) {

    ctx.fillStyle = "#000000";

    let camMoveX = (this.x - this.camera.x).toFixed(0) / 12;
    let camMoveY = (this.y - this.camera.y).toFixed(0) / 12;

    this.camera.x += camMoveX;
    this.camera.y += camMoveY;

    let posX = (this.x - (this.camera.x - this.world.screenCenterX)) * config.blockSize;
    let posY = (this.y - (this.camera.y - this.world.screenCenterY)) * config.blockSize;

    ctx.drawImage(this.playerTexture, posX - camMoveX, posY - camMoveX);

    this.renderInfo(fps);
  }
}
