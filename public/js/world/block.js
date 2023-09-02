import config from '../config.js';
import { getColor } from '../colors/colors.js';
let ctx = config.ctx;

export default class Block {
  constructor(x, y, blockId, chunk) {
    this.x = x;
    this.y = y;
    this.blockId = blockId;
    this.color = getColor(this.blockId);
    this.size = config.blockSize;
    chunk.blocks.set(`${x} ${y}`, this);
  }

  change(newId, debugColor) {
    this.blockId = newId;
    this.color = getColor(newId);
    if (!newId)  {
      this.color = debugColor;
    }
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