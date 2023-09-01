import config from '../config.js';
let ctx = config.ctx;

export default class Block {
  constructor(x, y, color, blockId, chunk) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.size = config.blockSize;

    chunk.blocks.set(`${x} ${y}`, this);
  }

  render(chunkOffsetX, chunkOffsetY)
  {
    if (this.blockId === 'game:air') return;

    let posX = (this.x * this.size) + chunkOffsetX;
    let posY = (this.y * this.size) + chunkOffsetY;

    ctx.fillStyle = this.color;
    ctx.fillRect(posX, posY, this.size, this.size);
  }
}