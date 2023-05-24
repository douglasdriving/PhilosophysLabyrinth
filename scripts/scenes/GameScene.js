//GameScene.js
const wallsScale = 0.5;
const enemyScale = 0.5;
const canvasWidth = 1024;
const canvasHeight = 768;
const enemySpeed = 75;

import Player from '../objects/Player.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {

    // Define cursor keys for movement
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.input.on('pointerdown', this.handlePointerDown, this);

    // Create walls
    this.createWalls();

    // Create enemies
    this.createEnemies();

    // Create projectiles
    this.projectiles = [];

    // Player
    this.player = new Player(this, 32, canvasHeight / 2);

    // Enable collisions
    this.physics.add.collider(this.player, this.walls);
  }

  update() {
    this.player.update(this.cursors);
    this.checkEnemiesPosition();
  }

  handlePointerDown(pointer) {
    this.player.handleShoot(pointer);
  }

  createWalls() {

    let maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // Create walls as immovable bodies
    this.walls = this.physics.add.staticGroup();
    const TILE_SIZE = 64 * wallsScale;
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        // if the current cell is a wall, create a wall at that position
        if (maze[y][x] === 1) {
          // this.physics.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'wall');
          this.walls.create(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, 'wall');
        }
      }
    }

    // Set wall properties
    this.walls.children.iterate((wall) => {
      wall.setBounce(1);
      wall.setImmovable(true);
      wall.setTintFill(0x808080);
      if (wallsScale !== 1) {
        wall.setScale(wallsScale, wallsScale);
        wall.body.setSize(wall.width * wallsScale, wall.height * wallsScale);
        wall.body.setOffset((wall.width - wall.body.width) / 2, (wall.height - wall.body.height) / 2);
      }
    });
  }

  createEnemy(startX, startY, moveAreaWidth, moveAreaHeight) {
    let moveArea = new Phaser.Geom.Rectangle(startX, startY, moveAreaWidth, moveAreaHeight);
    let enemy = this.physics.add.sprite(startX + moveAreaWidth / 2, startY + moveAreaHeight / 2, 'enemy');
    enemy.setScale(enemyScale, enemyScale);
    this.enemies.push({ enemy, moveArea });

    //area debug
    // let graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { alpha: 0.1 } });
    // graphics.strokeRectShape(moveArea);

  }

  createEnemies() {
    this.enemies = [];

    this.createEnemy(350, 300, 200, 200);
    this.createEnemy(150, 50, 300, 100);
    this.createEnemy(140, 500, 100, 200);
    this.createEnemy(450, 600, 400, 120);
    this.createEnemy(670, 250, 150, 300);
    this.createEnemy(560, 50, 150, 150);
    this.createEnemy(750, 50, 220, 100);

    this.changeEnemyDirection();
    this.time.addEvent(
      {
        delay: 2000,
        callback: this.changeEnemyDirection,
        callbackScope: this,
        loop: true
      }
    );
  }

  changeEnemyDirection() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i].enemy;
      let angle = Phaser.Math.Between(0, 360);  // Random angle
      let velocity = this.physics.velocityFromAngle(angle, enemySpeed);
      enemy.setVelocity(velocity.x, velocity.y);
    }
  }

  checkEnemiesPosition() {
    this.enemies.forEach(enemy => {
      if (!enemy.moveArea.contains(enemy.enemy.x, enemy.enemy.y)) {

        const areaCenterX = enemy.moveArea.x + enemy.moveArea.width / 2;
        const areaCenterY = enemy.moveArea.y + enemy.moveArea.height / 2;
        const enemyToCenterX = areaCenterX - enemy.enemy.x;
        const enemyToCenterY = areaCenterY - enemy.enemy.y;
        const oneStepTowardsCenterX = enemyToCenterX / (enemy.moveArea.width / 2);
        const oneStepTowardsCenterY = enemyToCenterY / (enemy.moveArea.height / 2);

        enemy.enemy.x += oneStepTowardsCenterX;
        enemy.enemy.y += oneStepTowardsCenterY;
        enemy.enemy.setVelocity(oneStepTowardsCenterX * enemySpeed, oneStepTowardsCenterY * enemySpeed);
      }
    });
  }

}

export default GameScene;
