import Wall from './Wall.js';

class WallGroup extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene, maze, wallColor, wallsScale) {
    super(scene.physics.world, scene);
    this.scene = scene;
  }

  createWalls(maze, wallsScale, wallColor) {

    this.dissapearingWalls = [];
    this.walls = [];
    const TILE_SIZE = 64 * wallsScale;
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        const tile = maze[y][x];
        if (tile === 1) {
          const wall = new Wall(this.scene, x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, wallColor, wallsScale)
          this.add(wall);
          this.walls.push(wall);
        }
        else if (tile === 2) {
          const wall = new Wall(this.scene, x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, wallColor, wallsScale)
          this.add(wall);
          this.dissapearingWalls.push(wall);
        }
      }
    }

  }

  dissapear() {
    this.dissapearingWalls.forEach(wall => {
      wall.destroy();
    });
  }

  unload() {
    this.children.entries.forEach(wall => {
      wall.destroy();
    });
  }
}

export default WallGroup;
