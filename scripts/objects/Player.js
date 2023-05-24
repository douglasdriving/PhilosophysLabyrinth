// Player.js
import Projectile from './Projectile.js';

const playerScale = 0.5;

class Player extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {

    super(scene, x, y, 'player');
    this.scene = scene;

    // Add this instance to the scene
    scene.add.existing(this);

    // Enable physics for this instance
    scene.physics.world.enableBody(this, 0);

    // Set player properties
    this.setCollideWorldBounds(true);
    this.setScale(playerScale, playerScale);

    //Player Controls
    this.cursors = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    scene.input.on('pointerdown', this.handleShoot, this);
  }

  update() {
    this.updateMovement();
  }

  updateMovement() {
    // Reset player velocity
    this.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(200);
    }

    // Vertical movement  
    if (this.cursors.up.isDown) {
      this.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(200);
    }
  }

  handleShoot(pointer) {

    const angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.x,
      pointer.y
    );

    const velX = Math.cos(angle) * 500;
    const velY = Math.sin(angle) * 500;

    // new Projectile(this.scene, this.x, this.y, velX, velY);
    this.scene.projectileGroup.createProjectile(this.x, this.y, velX, velY);

  }

}

export default Player;