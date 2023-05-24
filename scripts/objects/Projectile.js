class Projectile extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, velX, velY) {

    super(scene, x, y, 'projectile');
    this.scene = scene;

    // Add this instance to the scene
    scene.add.existing(this);

    // Enable physics for this instance
    scene.physics.world.enableBody(this, 0);

    //set velocity
    this.setVelocity(velX, velY);

    //colliders
    scene.physics.add.collider(this, this.scene.walls, this.destroy, null, this);
    // scene.physics.add.collider(this, this.scene.enemies, this.destroy, null, this);

    //remove projectile when it leaves the screen
    this.body.onWorldBounds = true; // Enable world bounds event
    this.body.setCollideWorldBounds(true); // Set world bounds
    this.body.world.on('worldbounds', this.destroy, this);

  }

}

export default Projectile;