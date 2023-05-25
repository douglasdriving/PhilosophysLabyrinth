//GameScene.js
import Player from '../objects/Player.js';
import WallGroup from '../objects/WallGroup.js';
import level from '../levels/level_intro.js'
import EnemyGroup from '../objects/Enemies.js';
import ProjectileGroup from '../objects/ProjectileGroup.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor(level.colorScheme.background);

    this.walls = new WallGroup(this, level.maze, level.colorScheme.wall, 0.5);
    this.enemyGroup = new EnemyGroup(this, level.enemyAreas, level.colorScheme.enemy);
    this.player = new Player(this, level.playerStart.x, level.playerStart.y, level.colorScheme.player);
    this.projectileGroup = new ProjectileGroup(this, level.colorScheme.projectile);

    //physics
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.enemyGroup, this.playerHit, null, this);
    this.physics.add.collider(this.enemyGroup, this.projectileGroup, this.enemyHit, null, this);

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

  cleared() {
    this.walls.dissapear();

    level.textOnClear.forEach((text) => {
      this.add.text(text.x, text.y, text.text, {
        fontSize: text.fontSize,
        fill: text.fill,
      });
    });
  }

}

export default GameScene;
