const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

const config = {
  WorldMaxHeight: 128,
  RenderDistanceX: 5,
  RenderDistanceY: 3,
  ChunkSizeX: 16,
  ChunkSizeY: 16,
  blockSize: 16,
  winWidth: window.innerWidth,
  winHeigth: window.innerHeight,
  movementAmount: 2,
  ctx: ctx
}

export default config;