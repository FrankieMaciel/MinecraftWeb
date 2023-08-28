import config from '../config.js';
let ctx = config.ctx;

export default class Block {
  constructor(x, y, color, blockId) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.size = config.blockSize;
  }

  render( ...offsets)
  {
    const xOffset = offsets.map((item) => item.x).reduce((pv, cv) => pv+cv);
    const yOffset = offsets.map((item) => item.y).reduce((pv, cv) => pv+cv);
    if (this.blockId === 'game:air') {
      ctx.clearRect(this.x + xOffset, this.y + yOffset, this.size, this.size);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x + xOffset, this.y + yOffset, this.size, this.size);
    }
  }
}