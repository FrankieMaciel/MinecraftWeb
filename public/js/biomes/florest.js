import config from "../config.js";

export function florest (x, y, block) {

  let expectedHeight = montain(x, 10, 0.001, -10) + (config.WorldMaxHeight / 2);
  let expectedHeight4 = montain(x, 20, 0.01, -20);

  if (y < expectedHeight + expectedHeight4) return block;
  if (block.blockId !== 'game:air') return block;

  block.change("game:rock");
  return block;
}

function montain(x, heigth, frequency, offset) {
  let sinValue = Math.sin(x * frequency);
  return heigth * sinValue + offset;
}