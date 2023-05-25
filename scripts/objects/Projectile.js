class Projectile extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, color) {

    super(scene, x, y, 'projectile');
    this.scene = scene;

    // Add this instance to the scene
    scene.add.existing(this);

    // Enable physics for this instance
    scene.physics.world.enableBody(this, 0);

    // Wall and enemy collision
    scene.physics.add.collider(this, this.scene.walls, this.destroy, null, this);
    scene.physics.add.collider(this, this.scene.enemies, (projectile, enemy) => {
      enemy.kill();
      projectile.destroy(); // destroy the projectile
    }, null, this);

    // Remove projectile when it leaves the screen
    this.body.onWorldBounds = true; // Enable world bounds event
    this.body.setCollideWorldBounds(true); // Set world bounds
    this.body.world.on('worldbounds', this.destroy, this);

    //color
    this.setTint(color);
  }

}

export default Projectile;
