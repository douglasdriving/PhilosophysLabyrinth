//GameScene.js
const playerScale = 0.5;
const wallsScale = 0.5;
const enemyScale = 0.5;
const canvasWidth = 1024;
const canvasHeight = 768;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {

    //player
    this.createPlayer();

    // Create walls
    this.createWalls();

    // Create enemies
    this.createEnemies();

    // Create projectiles
    this.projectiles = [];

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
    // this.checkEnemiesPosition();
    this.updatePlayerMovement();
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

    const destroyProjectile = (projectile) => {
      projectile.destroy();

      // Check if projectile is still valid before removing from the array
      if (this.projectiles.includes(projectile)) {
        const index = this.projectiles.indexOf(projectile);
        if (index > -1) {
          this.projectiles.splice(index, 1);
        }
      }
    };

    this.physics.add.collider(projectile, this.walls, destroyProjectile, null, this); // Listen for collisions between projectiles and walls

    //remove projectile when it leaves the screen
    projectile.body.onWorldBounds = true; // Enable world bounds event
    projectile.body.setCollideWorldBounds(true); // Set world bounds
    projectile.body.world.on('worldbounds', (body) => {
      destroyProjectile(body.gameObject);
    }, this);

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

    // Enable collisions between the walls and projectiles
    this.physics.add.collider(this.player, this.walls);
  }

  createPlayer() {
    this.player = this.physics.add.sprite(32, canvasHeight / 2, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(playerScale, playerScale);
  }

  createEnemies() {
    this.enemies = [];
    const startX = 500;
    const startY = 300;
    const width = 200;
    const height = 200;
    let moveArea = new Phaser.Geom.Rectangle(startX, startY, width, height);
    let enemy = this.physics.add.sprite(startX, startY, 'enemy');
    enemy.setScale(enemyScale, enemyScale);
    this.enemies.push({ enemy, moveArea });
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
      console.log('changing enemy direction');
      let speed = Phaser.Math.Between(50, 100);  // Random speed between 50 and 100
      let angle = Phaser.Math.Between(0, 360);  // Random angle
      let velocity = this.physics.velocityFromAngle(angle, speed);
      this.enemies[i].enemy.setVelocity(velocity.x, velocity.y);
    }
  }

  checkEnemiesPosition() {
    this.enemies.forEach(enemy => {
      if (!enemy.moveArea.contains(enemy.enemy.x, enemy.enemy.y)) {
        console.log('enemy out of bounds');
        //push the enemy back one step
        enemy.enemy.x -= enemy.enemy.body.velocity.x / 60;
        enemy.enemy.y -= enemy.enemy.body.velocity.y / 60;
        //reverse the velocity
        enemy.enemy.setVelocity(-enemy.enemy.body.velocity.x, -enemy.enemy.body.velocity.y);
      }
      else {
        console.log('enemy in bounds');
      }
    });
  }

  updatePlayerMovement() {

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
