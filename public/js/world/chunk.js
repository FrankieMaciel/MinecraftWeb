import Block from './block.js';
import config from '../config.js';
import { getBiome } from './biomes.js';

export default class Chunk {
  constructor(x, y, world) 
  {
    this.blocks = new Map();
    this.x = x;
    this.y = y;
    this.ChunkSizeX = config.ChunkSizeX;
    this.ChunkSizeY = config.ChunkSizeY;
    this.world = world;
    world.chunks.set(`${x} ${y}`, this);
    if (y < config.WorldMaxHeight) this.create();
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  static fromJSON(json) {
    return new Block(json.x, json.y);
  }

  create() 
  {
    for (let x = 0; x < this.ChunkSizeX; x++) 
    {
      for (let y = 0; y < this.ChunkSizeY; y++) 
      {
        let blockX = x + this.x;
        let blocky = y + this.y;

        let newBlock = new Block(x, y, "game:air", null, this);
        // console.log(this.x + ' ' + this.y);
        newBlock = getBiome(blockX, blocky, newBlock, this.world);
      }
    }
  }
  
  render(chunkOffsetX, chunkOffsetY)
  {
    for (const [_, block] of this.blocks) 
    {
      block.render(chunkOffsetX, chunkOffsetY);
    }
  }
}