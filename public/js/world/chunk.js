import Block from './block.js';
import config from '../config.js';
import getSurfaceNoise from '../noise/noise.js';
import { getRandomColor, getRandomColorDirt, getRandomColorRock } from '../colors/colors.js'
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
    this.world.chunks.set(`${x} ${y}`, this);

    if (y < config.WorldMaxHeight) this.create();
  }

  create() 
  {
    for (let x = 0; x < this.ChunkSizeX; x++) 
    {
      for (let y = 0; y < this.ChunkSizeY; y++) 
      {
        let blockX = x + this.x;
        let blocky = y + this.y;

        let newBlock = new Block(x, y, "#000000", "game:air", this);

        newBlock = getBiome(blockX, blocky, newBlock, this.world);
        this.blocks.set(`${x} ${y}`, newBlock);
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