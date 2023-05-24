const scale = 0.5;
const speed = 75;

class Enemy extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, width, height) {

    const enemyPosX = x + width / 2;
    const enemyPosY = y + height / 2;

    super(scene, enemyPosX, enemyPosY, 'enemy');
    this.scene = scene;

    scene.add.existing(this);
    scene.physics.world.enableBody(this, 0);
    this.setScale(scale, scale);

    //area
    this.moveArea = new Phaser.Geom.Rectangle(x, y, width, height);
    // let graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { alpha: 0.1 } });
    // graphics.strokeRectShape(this.moveArea);

    //enable movement
    this.changeDirection();
    this.scene.time.addEvent(
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

}

export default Enemy;