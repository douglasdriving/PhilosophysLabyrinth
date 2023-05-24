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

  }

  update(cursors) {
    this.updateMovement(cursors);
  }

  updateMovement(cursors) {
    // Reset player velocity
    this.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      this.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      this.setVelocityX(200);
    }

    // Vertical movement  
    if (cursors.up.isDown) {
      this.setVelocityY(-200);
    } else if (cursors.down.isDown) {
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

    new Projectile(this.scene, this.x, this.y, velX, velY);

  }

}

export default Player;