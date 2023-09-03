import Chunk from './chunk.js';
import config from '../config.js'
import Block from './block.js';
export default class World {
  constructor(name, seed) {
    this.name = name;
    if (seed) this.seed = seed;
    else this.seed = Math.random();
    this.SufarceLevel = config.WorldMaxHeight / 2;
    this.chunks = new Map();

    this.screenCenterX;
    this.screenCenterY;

    this.create();
    this.getCenterScreen();
  }

  toJSON() {
    const chunksData = Array.from(this.chunks).map(([chunkKey, chunkValue]) => {
      const blocksData = Array.from(chunkValue.blocks).map(([blockKey, blockValue]) => {
        // Serializar os dados do bloco aqui
        return blockValue.toJSON();
      });

      return { chunkKey, blocks: blocksData };
    });

    return { chunks: chunksData };
  }

  static fromJSON(json) {
    const mundo = new World();

    for (const chunkData of json.chunks) {
      const chunk = new Chunk(chunkData.chunkKey);

      for (const blockData of chunkData.blocks) {
        // Desserializar os dados do bloco e criar instâncias de blocos
        const block = Block.fromJSON(blockData);
        chunk.blocks.set(block.key, block);
      }

      mundo.chunks.set(chunk.key, chunk);
    }

    return mundo;
  }

  getCenterScreen() {
    this.screenCenterX = (config.winWidth / config.blockSize).toFixed(0) / 2;
    this.screenCenterY = (config.winHeigth / config.blockSize).toFixed(0) / 2;
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
        let newChunk = new Chunk(BlockX, BlockY, this);
        this.chunks.set(`${BlockX} ${BlockY}`, newChunk);
      }
    }
  }

  getBlockAt(x, y) {
    let ChunkX = Math.floor(x / config.ChunkSizeX) * config.ChunkSizeX;
    let ChunkY = Math.floor(y / config.ChunkSizeY) * config.ChunkSizeY;

    let Xblock = Math.floor((x / config.blockSize) * config.blockSize) - ChunkX;
    let Yblock = Math.floor((y / config.blockSize) * config.blockSize) - ChunkY;

    let chunk = this.chunks.get(`${ChunkX} ${ChunkY}`);
    if (!chunk) return null;
    let block = chunk.blocks.get(`${Xblock} ${Yblock}`);
    if (!block) return null;
    return block;
  }
  
  setBlockAt(x, y, id, debugColor) {
    let ChunkX = Math.floor(x / config.ChunkSizeX) * config.ChunkSizeX;
    let ChunkY = Math.floor(y / config.ChunkSizeY) * config.ChunkSizeY;

    let Xblock = Math.floor((x / config.blockSize) * config.blockSize) - ChunkX;
    let Yblock = Math.floor((y / config.blockSize) * config.blockSize) - ChunkY;

    let chunk = this.chunks.get(`${ChunkX} ${ChunkY}`);
    if (!chunk) return null;
    let block = chunk.blocks.get(`${Xblock} ${Yblock}`);
    if (!block) return null;

    block.change(id, debugColor);
    chunk.blocks.set(`${Xblock} ${Yblock}`, block);
    this.chunks.set(`${ChunkX} ${ChunkY}`, chunk);
    return true;
  }

  render(playerCam) {
    let ChunkSizeX = config.ChunkSizeX;
    let ChunkSizeY = config.ChunkSizeY;

    let Xinit = Math.floor((playerCam.x - this.screenCenterX) / ChunkSizeX) * ChunkSizeX;
    let Yinit = Math.floor((playerCam.y - this.screenCenterY) / ChunkSizeY) * ChunkSizeY;
    
    let MaxXnum = Xinit + Math.floor((config.winWidth / ChunkSizeX)) + ChunkSizeX;
    let MaxYnum = Yinit + Math.floor((config.winHeigth / ChunkSizeY)) + ChunkSizeY;
    
    for (let x = Xinit; x < MaxXnum; x += ChunkSizeX)
    {
      for (let y = Yinit; y < MaxYnum; y += ChunkSizeY) 
      {
        let chunk = this.chunks.get(`${x} ${y}`);
        if (!chunk) chunk = new Chunk(x, y, this);

        let XrenderPos = (x - (playerCam.x - this.screenCenterX)) * config.blockSize;
        let YrenderPos = (y - (playerCam.y - this.screenCenterY)) * config.blockSize;

        chunk.render(XrenderPos, YrenderPos);
      }
    }
  }
}