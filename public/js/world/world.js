import { createChunk } from './worldgeneration.js'

class world {
  constructor(
    worldname,
    seed,
    worldSpace
  ) {
    this.name = worldname;
    this.seed = seed;
    this.chunkSize = 16;
    this.worldSpace = worldSpace;
    this.renderDistance = 5;
  }

  generateWorld() {
    for (let x = 0; x < this.renderDistance; x++) {

      let xpos = x * this.chunkSize;

      createChunk(xpos, 20, 10, this.chunkSize, this.worldSpace);
    }
  }
}

export default world;