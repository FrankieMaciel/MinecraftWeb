import { florest } from "../biomes/florest.js";
import { caveNoise } from "../biomes/caves.js";

import config from "../config.js";

export function getBiome(x, y, block, world) {

  let newBlock = block;

  if (y === config.WorldMaxHeight - 1) {
    newBlock.change("game:limit");
    return newBlock;
  }
  
  let isSurface = y <= config.WorldMaxHeight / 2;
  
  let generate = caveNoise(world.seed, x, y, config.blockSize, 2.5);
  
  if (generate > 0) return block;

  if (isSurface) {
    newBlock = florest(x, y, block);
  } else {
    newBlock.change("game:rock");
  }
  let blockAtTop = world.getBlockAt(x, y - 1);
  if (!blockAtTop || !isSurface) return newBlock;
  // console.log(blockAtTop);

  if (newBlock.blockId !== 'game:air' && blockAtTop.blockId === 'game:air') {
    newBlock.change("game:grass");
  }

  if (blockAtTop.blockId === 'game:grass') {
    newBlock.change("game:dirt");
  }

  if (blockAtTop.blockId === 'game:dirt') {
    newBlock.change("game:middirt");
  }

  return newBlock;
}