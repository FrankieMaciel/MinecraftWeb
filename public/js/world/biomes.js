import { florest } from "../biomes/florest.js";
import { caveNoise } from "../biomes/caves.js";

import config from "../config.js";

export function getBiome(x, y, block, world) {

  let newBlock = block;
  let isSurface = y < world.SufarceLevel;

  let generate = caveNoise(x, y, 40 * config.blockSize, 4);

  if (generate > 0) return block;

  if (isSurface) {
    newBlock = florest(x, y, newBlock);
  } else {
    newBlock.color = "#999999"
    newBlock.blockId = "game:rock"
  }

  return newBlock;
}