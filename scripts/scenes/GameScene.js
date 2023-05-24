//GameScene.js
import Player from '../objects/Player.js';
import Walls from '../objects/Walls.js';
import level from '../levels/level1.js';
import EnemyGroup from '../objects/Enemies.js';

const canvasHeight = 768;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.walls = new Walls(this, level.maze);
    this.enemies = new EnemyGroup(this, level.enemyAreas);
    this.player = new Player(this, 32, canvasHeight / 2);
    this.physics.add.collider(this.player, this.walls);
  }

  update() {
    this.player.update();
    this.enemies.checkPositions();
  }

}

export default GameScene;
