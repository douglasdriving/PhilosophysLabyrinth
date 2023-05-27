import Enemy from "./Enemy.js";

class EnemyGroup extends Phaser.Physics.Arcade.Group {

  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
  }

  createEnemies(enemyAreas, enemyColor) {

    enemyAreas.forEach(area => {
      const enemy = new Enemy(this.scene, area.x, area.y, area.width, area.height, this, enemyColor);
      this.add(enemy);
      enemy.changeDirection();
    });

  }

  checkPositions() {

    this.children.iterate(enemy => {
      enemy.checkPosition();
    });

  }

}

export default EnemyGroup;