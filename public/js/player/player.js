import Camera from './camera.js';
import config from '../config.js';

export default class Player {
  constructor() {
    this.RenderDistanceX = config.RenderDistanceX;
    this.RenderDistanceY = config.RenderDistanceY;
    this.camera = new Camera();
    this.speed = config.movementAmount;
  }

  onKeyDown(key) {
    const action = keybinds[key];
    if (action) 
    {
      action(this.camera, this.speed);
    }
  }
}

const keybinds = {
  'a': (camera, movementAmount) => {
    camera.x -= movementAmount;
  },
  's': (camera, movementAmount) => {
    camera.y += movementAmount;
  },
  'w': (camera, movementAmount) => {
    camera.y -= movementAmount;
  },
  'd': (camera, movementAmount) => {
    camera.x += movementAmount;
  }
}