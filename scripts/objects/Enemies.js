import Enemy from "./Enemy.js";

class EnemyGroup extends Phaser.Physics.Arcade.Group {

  constructor(scene, enemyAreas) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.createEnemies(enemyAreas);
  }

  createEnemies(enemyAreas) {

    enemyAreas.forEach(area => {
      const enemy = new Enemy(this.scene, area.x, area.y, area.width, area.height, this);
      this.add(enemy);
    });

  }

  checkPositions() {

    this.children.iterate(enemy => {
      enemy.checkPosition();
    });

  }

}

export default EnemyGroup;