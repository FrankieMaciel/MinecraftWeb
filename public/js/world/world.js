import Chunk from './chunk.js';
import config from '../config.js'
export default class World {
  constructor(name) {
    this.name = name;
    this.SufarceLevel = config.WorldMaxHeight / 2;
    this.chunks = new Map();

    this.create();
  }

  create() 
  {
    let RenderDistanceX = config.RenderDistanceX;
    let RenderDistanceY = config.RenderDistanceY;

    for (let x = 0; x < RenderDistanceX; x++) {
      for (let y = 0; y < RenderDistanceY; y++) 
      {
        let BlockX = x * config.ChunkSizeX;
        let BlockY = y * config.ChunkSizeY;
        new Chunk(BlockX, BlockY, this);
      }
    }
  }

  render(playerCam) {
    let ChunkSizeX = config.ChunkSizeX;
    let ChunkSizeY = config.ChunkSizeY;

    let Xinit = Math.floor(playerCam.x / ChunkSizeX) * ChunkSizeX;
    let Yinit = Math.floor(playerCam.y / ChunkSizeY) * ChunkSizeY;
    
    let MaxXnum = Xinit + Math.floor((config.winWidth / ChunkSizeX)) + ChunkSizeX;
    let MaxYnum = Yinit + Math.floor((config.winHeigth / ChunkSizeY)) + ChunkSizeY;
    
    for (let x = Xinit; x < MaxXnum; x += ChunkSizeX)
    {
      for (let y = Yinit; y < MaxYnum; y += ChunkSizeY) 
      {
        let chunk = this.chunks.get(`${x} ${y}`);
        if (!chunk) chunk = new Chunk(x, y, this);

        let XrenderPos = (x - playerCam.x) * config.blockSize;
        let YrenderPos = (y - playerCam.y) * config.blockSize;

        chunk.render(XrenderPos, YrenderPos);
      }
    }
  }
}