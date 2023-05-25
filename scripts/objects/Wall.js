class Wall extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, wallColor, wallsScale) {
    super(scene, x, y, 'wall');

    // properties
    this.scene = scene;
    scene.add.existing(this); // add to display list
    scene.physics.add.existing(this, true); //add to physics system
    this.setTintFill(wallColor);
    if (wallsScale !== 1) {
      this.setScale(wallsScale, wallsScale);
      this.body.setSize(this.width * wallsScale, this.height * wallsScale);
      this.body.setOffset((this.width - this.body.width) / 2, (this.height - this.body.height) / 2);
    }
  }
}

export default Wall;
