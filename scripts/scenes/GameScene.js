//GameScene.js
import Player from '../objects/Player.js';
import Walls from '../objects/Walls.js';
import level from '../levels/level_intro.js'
import EnemyGroup from '../objects/Enemies.js';
import ProjectileGroup from '../objects/ProjectileGroup.js';

const canvasHeight = 768;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.walls = new Walls(this, level.maze);
    this.enemyGroup = new EnemyGroup(this, level.enemyAreas);
    this.player = new Player(this, 150, canvasHeight / 2);
    this.projectileGroup = new ProjectileGroup(this);

    //physics
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.enemyGroup, this.playerHit, null, this);
    this.physics.add.collider(this.enemyGroup, this.projectileGroup, this.enemyHit , null, this);
  }

  update() {
    this.player.update();
    this.enemyGroup.checkPositions();
  }

  playerHit() {
    this.scene.start('GameOverScene');
  }

  enemyHit(enemy, projectile) {
    enemy.kill();
    projectile.destroy();
  }

}

export default GameScene;
