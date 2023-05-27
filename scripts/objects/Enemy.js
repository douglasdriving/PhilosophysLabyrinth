const scale = 0.5;
const speed = 75;
const showDebug = false;

class Enemy extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, width, height, enemyGroup, color) {

    //random pos in area
    const randomX = Phaser.Math.Between(x, x + width);
    const randomY = Phaser.Math.Between(y, y + height);

    super(scene, randomX, randomY, 'enemy');
    this.scene = scene;
    this.group = enemyGroup;

    scene.add.existing(this);
    scene.physics.world.enableBody(this, 0);
    this.setScale(scale, scale);

    //area
    this.createMoveArea(x, y, width, height, scene);
    this.enambleMovement();
    this.setTintFill(color);

  }

  createMoveArea(x, y, width, height, scene) {
    this.moveArea = new Phaser.Geom.Rectangle(x, y, width, height);
    if (showDebug) {
      let graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { alpha: 0.1 } });
      graphics.strokeRectShape(this.moveArea);
    }
  }

  enambleMovement() {
    this.turnTimer = this.scene.time.addEvent(
      {
        delay: 2000,
        callback: this.changeDirection,
        callbackScope: this,
        loop: true
      }
    );
  }

  changeDirection() {
    let angle = Phaser.Math.Between(0, 360);  // Random angle
    let velocity = this.scene.physics.velocityFromAngle(angle, speed);
    this.setVelocity(velocity.x, velocity.y);
  }

  checkPosition() {
    if (!this.moveArea.contains(this.x, this.y)) {

      const areaCenterX = this.moveArea.x + this.moveArea.width / 2;
      const areaCenterY = this.moveArea.y + this.moveArea.height / 2;
      const enemyToCenterX = areaCenterX - this.x;
      const enemyToCenterY = areaCenterY - this.y;
      const oneStepTowardsCenterX = enemyToCenterX / (this.moveArea.width / 2);
      const oneStepTowardsCenterY = enemyToCenterY / (this.moveArea.height / 2);

      this.x += oneStepTowardsCenterX;
      this.y += oneStepTowardsCenterY;
      this.setVelocity(oneStepTowardsCenterX * speed, oneStepTowardsCenterY * speed);
    }
  }

  kill() {
    if (this.group.children.entries.length <= 1) {
      console.log('cleared');
      this.scene.cleared();
    }

    this.turnTimer.destroy();
    this.destroy();
  }

}

export default Enemy;