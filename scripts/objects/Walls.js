const wallsScale = 0.5;

class Walls extends Phaser.Physics.Arcade.StaticGroup {

  constructor(scene, maze) {
    super(scene.physics.world, scene)
    this.scene = scene;
    this.createWalls(maze);
  }

  createWalls(maze) {

    // Create walls as immovable bodies
    const TILE_SIZE = 64 * wallsScale;
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        // if the current cell is a wall, create a wall at that position
        if (maze[y][x] === 1) {
          // this.physics.add.sprite(x * TILE_SIZE, y * TILE_SIZE, 'wall');
          this.create(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, 'wall');
        }
      }
    }

    // Set wall properties
    this.children.iterate((wall) => {
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

}

export default Walls;