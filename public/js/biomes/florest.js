import config from "../config.js";

export function florest(x, y, block) {

  const expectedHeight = montain(x, 100, 0.001, -100);
  const expectedHeight2 = montain(x, 500, 0.001, -500);

  if ((y > expectedHeight) && (y > expectedHeight2)) {
    block.color = "#999999"
    block.blockId = "game:rock"
    return block;
  };

  if (((y + (3 * config.blockSize)) > expectedHeight) && ((y + (1 * config.blockSize)) > expectedHeight2)) {
    block.color = "#5c5049";
    block.blockId = "game:dirt";
    return block;
  }

  if (((y + (4 * config.blockSize)) > expectedHeight) && ((y + (4 * config.blockSize)) > expectedHeight2)) {
    block.color = "#87cc8e";
    block.blockId = "game:dirt";
  }


  return block;
}

function montain(x, heigth, frequency, offset) {
  let sinValue = Math.sin(x * frequency);
  // if (sinValue > 0) sinValue = -sinValue;
  return heigth * sinValue + offset;
}

// newBlock.color = "#5c5049"
//       newBlock.blockId = "game:dirt"