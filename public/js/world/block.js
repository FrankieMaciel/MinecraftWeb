import config from '../config.js';
import { getColor } from '../colors/colors.js';
let ctx = config.ctx;

export default class Block {
  constructor(x, y, blockId, color, chunk) {
    this.x = x;
    this.y = y;
    this.blockId = blockId;

    if (color) this.color = color;
    else this.color = getColor(this.blockId);

    this.size = config.blockSize;
    this.isTangible = true;
    if (this.blockId === 'game:creative') this.isTangible = false;
    chunk.blocks.set(`${x} ${y}`, this);
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      blockId: this.blockId,
      color: this.color,
    };
  }

  static fromJSON(json) {
    return new Block(json.x, json.y, json.blockId, json.color);
  }

  change(newId, debugColor) {
    this.blockId = newId;
    this.color = getColor(newId);
    if (newId === 'game:creative') {
      this.isTangible = false;
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