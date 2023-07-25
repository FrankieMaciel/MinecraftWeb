import block from "../block/block.js";

let worldDeep = 10;

function getSurfaceNoise(x, smooth, intensity) {
  let Xsmooth = x / smooth;
  let noise = parseInt(perlin.get(Xsmooth, Xsmooth) * intensity);
  return noise;
}

function getStoneNoise(x, smooth, intensity) {
  let Xsmooth = ((x + 1) / smooth);
  let noise = parseInt(perlin.get(Xsmooth, Xsmooth) * intensity + 1);
  return noise;
}

function createChunk(x, smooth, intensity, chunkSize, worldSpace) {

  let xmax = x + chunkSize;
  
  for (let xpos = x; xpos < xmax; xpos++) {

    let stoneLevel = getStoneNoise(xpos, smooth, intensity) + (worldDeep - 3);
    
    let ymax = getSurfaceNoise(xpos, smooth, intensity) + worldDeep;

    for (let y = ymax; y > 0; y--) {

      let b = new block(worldSpace, 'block', 1, 'dirt', xpos, y);
      
      if (y === ymax) b.id = 0;
      if (y < stoneLevel) b.id = 2;
      
      b.create();
    }
  }
}

export {
  createChunk
};