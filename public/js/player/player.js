import { walkFoward as walk } from './playermovement.js';

class player {
  constructor (
    name,
  ) {
    this.name = name;
    this.life = 9;
    this.speed = 5;
    this.jumpForce = 10;
  }

  walkFoward() {
    walk();
  }
}

export default player;