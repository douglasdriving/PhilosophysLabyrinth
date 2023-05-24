import Projectile from "./Projectile.js";

class ProjectileGroup extends Phaser.Physics.Arcade.Group {

  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
  }

  createProjectile(x, y, velocityX, velocityY) {
    const projectile = new Projectile(this.scene, x, y);
    this.add(projectile);
    projectile.setVelocity(velocityX, velocityY);
  }

}

export default ProjectileGroup;