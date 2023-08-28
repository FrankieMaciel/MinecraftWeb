import Chunk from './chunk.js';
import config from '../config.js'
export default class World {
  constructor(name, player) {
    this.name = name;
    this.player = player;
    this.SufarceLevel = config.WorldMaxHeight / 2;
    this.chunks = new Map();

    this.create();
  }

  create() 
  {
    let camera = this.player.camera;
    let RenderDistanceX = config.RenderDistanceX;
    let RenderDistanceY = config.RenderDistanceY;

    for (let x = camera.x; x < camera.x + RenderDistanceX; x++) {
      for (let y = camera.y; y < camera.y + RenderDistanceY; y++) 
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

    let Xinit2 = playerCam.x / ChunkSizeX * ChunkSizeX;
    let Yinit2 = playerCam.y / ChunkSizeY * ChunkSizeY;

    let MaxXnum = (config.winWidth / ChunkSizeX);
    let MaxYnum = (config.winHeigth / ChunkSizeY);

    for (let Xchunk = Xinit; Xchunk < Xinit + MaxXnum + (ChunkSizeX * 2); Xchunk += ChunkSizeX) 
    {
      for (let Ychunk = Yinit; Ychunk < Yinit + MaxYnum + (ChunkSizeY * 2); Ychunk += ChunkSizeY) 
      {
        var toRenderChunk;
        const retrievedChunk = this.chunks.get(`${Xchunk} ${Ychunk}`);
        if (retrievedChunk) 
        { 
          toRenderChunk = retrievedChunk;
        } else 
        {
          let newChunk = new Chunk(Xchunk, Ychunk, this);
          toRenderChunk = newChunk;
        }
        
        let xOffset = ((Xchunk - Xinit2) * ChunkSizeX);
        let yOffset = ((Ychunk - Yinit2) * ChunkSizeY);

        toRenderChunk.render(playerCam, xOffset, yOffset);
      }
    }
  }
}