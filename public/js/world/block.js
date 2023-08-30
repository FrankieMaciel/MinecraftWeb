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

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + chunkOffsetX, this.y + chunkOffsetY, this.size, this.size);
  }
}