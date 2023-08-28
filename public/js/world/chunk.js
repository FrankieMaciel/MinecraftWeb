import Block from './block.js';
import config from '../config.js';
import getSurfaceNoise from '../noise/noise.js';
import { getRandomColor, getRandomColorDirt, getRandomColorRock } from '../colors/colors.js'
import { getBiome } from './biomes.js';

export default class Chunk {
  constructor(x, y, world) 
  {
    this.blocks = [];
    this.x = x;
    this.y = y;
    this.ChunkSizeX = config.ChunkSizeX;
    this.ChunkSizeY = config.ChunkSizeY;
    this.world = world;
    this.world.chunks.set(`${x} ${y}`, this);

    this.create();
  }

  create() 
  {
    for (let x = 0; x < this.ChunkSizeX; x++) 
    {
      for (let y = 0; y < this.ChunkSizeY; y++) 
      {
        let cubeSize = config.blockSize;
        let blockX = (x + this.x) * cubeSize;
        let blocky = (y + this.y) * cubeSize;

        let newBlock = new Block(x * cubeSize, y * cubeSize, "#000000", "game:air");

        newBlock = getBiome(blockX, blocky, newBlock, this.world);
        this.blocks.push(newBlock);
      }
    }
  }

  render(chunkOffsetX, chunkOffsetY)
  {
    for (const block of this.blocks) 
    {
      block.render(chunkOffsetX, chunkOffsetY);
    }
  }
}