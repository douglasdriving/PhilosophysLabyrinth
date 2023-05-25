class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('player', '../images/player.png');
    this.load.image('wall', '../images/wall.png');
    this.load.image('projectile', '../images/projectile.png');
    this.load.image('enemy', '../images/enemy.png');
    this.load.image('mouseLeftIcon', '../images/mouseLeftIcon.png');
    this.load.image('wasdIcon', '../images/wasdIcon.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}

export default BootScene;
