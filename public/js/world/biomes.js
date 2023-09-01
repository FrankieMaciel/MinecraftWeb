import { florest } from "../biomes/florest.js";
import { caveNoise } from "../biomes/caves.js";

import config from "../config.js";

export function getBiome(x, y, block, world) {

  let newBlock = block;

  let isSurface = y <= config.WorldMaxHeight / 2;

  let generate = caveNoise(x * config.blockSize, y * config.blockSize, 40 * config.blockSize, 4);

  if (generate > 0) return block;

  if (isSurface) {
    newBlock = florest(x, y, block);

    

  } else {
    newBlock.color = "#999999"
    newBlock.blockId = "game:rock"
  }

  return newBlock;
}

function findLargestYForEachX(map) {
  const result = new Map();

  for (const [key, value] of map.entries()) {
    const { x, y } = value;

    if (!result.has(x) || y > result.get(x).y) {
      result.set(x, value);
    }
  }

  return result;
}