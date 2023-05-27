//GameScene.js
import Player from '../objects/Player.js';
import WallGroup from '../objects/WallGroup.js';
import level0 from '../levels/level0.js'
import level1 from '../levels/level1.js'
import level2 from '../levels/level2.js';
import EnemyGroup from '../objects/Enemies.js';
import ProjectileGroup from '../objects/ProjectileGroup.js';

const showDebug = false;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  //creating the scene
  create() {
    this.levels = [level0, level1, level2];
    this.currentLevel = 0;
    this.texts = [];
    this.createObjects(this.levels[this.currentLevel]);
    this.loadLevel(this.levels[this.currentLevel]);
  }

  createObjects(level) {
    this.projectileGroup = new ProjectileGroup(this, level.colorScheme.projectile);
    this.wallGroup = new WallGroup(this, level.maze, level.colorScheme.wall, 0.5);
    this.enemyGroup = new EnemyGroup(this, level.enemyAreas, level.colorScheme.enemy);
    this.player = new Player(this, level.playerStart.x, level.playerStart.y, level.colorScheme.player);
    this.images = [];
    if (showDebug) this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { alpha: 0.1 } });
    this.exits = [];
  }

  //update
  update() {
    if (this.player) this.player.update();
    if (this.enemyGroup) this.enemyGroup.checkPositions();
    this.exits.forEach((exit) => {
      if (exit.area.contains(this.player.x, this.player.y)) {
        this.currentLevel = exit.nextLevel;
        this.loadLevel(this.levels[this.currentLevel]);
      }
    });
  }

  //collision events
  playerHit() {
    this.scene.start('GameOverScene');
  }

  enemyHit(enemy, projectile) {
    enemy.kill();
    projectile.destroy();
  }

  wallHit(wall, projectile) {
    projectile.destroy();
  }

  //scene cleared
  cleared() {
    this.wallGroup.dissapear();
    this.displayClearedText();
  }
  displayClearedText() {
    if (!this.levels[this.currentLevel].textOnClear) return;
    this.levels[this.currentLevel].textOnClear.forEach((text) => {
      let addedText = this.add.text(text.x, text.y, text.text, {
        fontSize: text.fontSize,
        fill: text.fill,
      });
      this.texts.push(addedText);
    });
  }

  //level loading
  loadLevel(level) {

    this.unloadLevel();
    this.cameras.main.setBackgroundColor(level.colorScheme.background);
    this.loadObjects(level);
    this.loadColliders();
    this.loadExits(level);
  }

  loadObjects(level) {
    this.wallGroup.createWalls(level.maze, 0.5, level.colorScheme.wall);
    this.enemyGroup.createEnemies(level.enemyAreas, level.colorScheme.enemy);
    this.player.x = level.playerStart.x;
    this.player.y = level.playerStart.y;
    level.images.forEach((image) => {
      this.images.push(
        this.add.image(image.x, image.y, image.image)
      );
    });
  }

  loadColliders() {
    this.colliders = [
      this.physics.add.collider(this.player, this.wallGroup),
      this.physics.add.collider(this.player, this.enemyGroup, this.playerHit, null, this),
      this.physics.add.collider(this.enemyGroup, this.projectileGroup, this.enemyHit, null, this),
      this.physics.add.collider(this.wallGroup, this.projectileGroup, this.wallHit, null, this)
    ];
  }

  loadExits(level) {
    if (level.exits)
      level.exits.forEach((exit) => {
        let exitRect = new Phaser.Geom.Rectangle(exit.x, exit.y, exit.width, exit.height);
        if (showDebug) this.graphics.strokeRectShape(exitRect);
        this.exits.push({
          area: exitRect,
          nextLevel: exit.nextLevel
        });
      });
  }

  //unloading scene
  unloadLevel() {

    this.unloadGroup(this.wallGroup);
    this.unloadGroup(this.enemyGroup);
    this.unloadGroup(this.projectileGroup);
    this.unloadArray(this.images);
    this.unloadArray(this.texts);
    if (showDebug) this.graphics.clear();
    this.exist = [];
    this.unloadColliders();

  }

  unloadColliders() {
    if (this.colliders) this.colliders.forEach((collider) => {
      this.physics.world.removeCollider(collider);
    });
  }

  unloadGroup(group) {
    if (group) {
      group.children.each(child => {
        child.destroy();
      });
    }
  }

  unloadArray(array) {
    if (array) {
      array.forEach(item => {
        item.destroy();
      })
    }
  }

}

export default GameScene;
