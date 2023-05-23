class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  handleShoot(pointer) {

    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      pointer.x,
      pointer.y
    );

    const velocityX = Math.cos(angle) * 500;
    const velocityY = Math.sin(angle) * 500;

    const projectile = this.physics.add.sprite(
      this.player.x,
      this.player.y,
      'projectile'
    );

    projectile.setVelocity(velocityX, velocityY);

    this.projectiles.push(projectile);

    const destroyProjectile = () => {
      projectile.destroy();

      // Check if projectile is still valid before removing from the array
      if (this.projectiles.includes(projectile)) {
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
          this.projectiles.splice(index, 1);
        }
      }

      console.log('destroyed');
    };

    this.physics.add.collider(projectile, this.walls, destroyProjectile, null, this); // Listen for collisions between projectiles and walls

    //remove projectile when it leaves the screen
    projectile.body.onWorldBounds = true; // Enable world bounds event
    projectile.body.setCollideWorldBounds(true); // Set world bounds
    // projectile.body.world.on('worldbounds', () => { console.log('bounds collision') }, null, this); // Collide with world bounds
    projectile.body.world.on('worldbounds', (body) => {
      if (body.gameObject === projectile) {
        projectile.destroy();
      }
    }, this);

  }



  createWalls() {
    // Create walls as immovable bodies
    this.walls = this.physics.add.staticGroup();

    // Add walls to the group
    this.walls.create(400, 50, 'wall');
    this.walls.create(400, 550, 'wall');
    this.walls.create(50, 300, 'wall');
    this.walls.create(750, 300, 'wall');

    // Set wall properties
    this.walls.children.iterate((wall) => {
      wall.setBounce(1);
      wall.setImmovable(true);
    });

    // Enable collisions between the walls and projectiles
    this.physics.add.collider(this.player, this.walls);
  }

  create() {

    //add player to the scene
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);

    // Create walls
    this.createWalls();

    //projectiles
    this.projectiles = []; // Empty array to hold projectiles

    // Define cursor keys for movement
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.input.on('pointerdown', this.handleShoot, this);
  }

  update() {

    // Reset player velocity
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    }

  }
}

export default GameScene;
