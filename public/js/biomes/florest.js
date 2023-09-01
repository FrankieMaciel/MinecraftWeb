import config from "../config.js";
import { caveNoise } from "./caves.js";

export function florest(x, y, block) {

  let noise = caveNoise(x, x , 400, 400);
  let noise2 = caveNoise(y, y , 400, 400);
  
  let expectedHeight = (noise + montain(x, 10, 0.001, -10 -noise)) + (config.WorldMaxHeight / 2);
  let expectedHeight2 = montain(x, 5, 0.001, -5 - noise2);
  let expectedHeight4 = montain(x, 20, 0.01, -20);

  if (y < (expectedHeight + expectedHeight4) + expectedHeight2) return block;

  block.change("game:rock");
  return block;
}

function montain(x, heigth, frequency, offset) {
  let sinValue = Math.sin(x * frequency);
  // if (sinValue > 0) sinValue = -sinValue;
  return heigth * sinValue + offset;
}

// newBlock.color = "#5c5049"
//       newBlock.blockId = "game:dirt"