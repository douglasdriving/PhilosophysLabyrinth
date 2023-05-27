const level = {
  maze: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  enemyAreas: [
    { x: 170, y: 270, width: 100, height: 150 },
    { x: 290, y: 270, width: 100, height: 150 },
    { x: 50, y: 50, width: 200, height: 60 },
    { x: 170, y: 150, width: 80, height: 120 },
    { x: 50, y: 150, width: 60, height: 120 },
    { x: 290, y: 500, width: 100, height: 80 },
    { x: 180, y: 500, width: 100, height: 80 },
    { x: 70, y: 500, width: 100, height: 80 },
    { x: 290, y: 650, width: 100, height: 80 },
    { x: 180, y: 650, width: 100, height: 80 },
    { x: 70, y: 650, width: 100, height: 80 },
    { x: 620, y: 610, width: 100, height: 120 },
    { x: 510, y: 610, width: 100, height: 120},
    { x: 400, y: 650, width: 100, height: 80 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 460, y: 270, width: 250, height: 250 },
    { x: 300, y: 50, width: 210 , height: 60 },
    { x: 300, y: 50, width: 210 , height: 60 },
    { x: 520, y: 50, width: 210 , height: 60 },
    { x: 520, y: 50, width: 210 , height: 60 },
    { x: 600, y: 130, width: 230 , height: 80 },
    { x: 600, y: 130, width: 230 , height: 80 },
    { x: 600, y: 130, width: 230 , height: 80 },
    { x: 800, y: 50, width: 190 , height: 80 },
    { x: 800, y: 50, width: 190 , height: 80 },
    { x: 800, y: 50, width: 190 , height: 80 },
    { x: 900, y: 150, width: 70 , height: 80 },
    { x: 900, y: 250, width: 70 , height: 80 },
    { x: 820, y: 270, width: 70 , height: 80 },
    { x: 780, y: 350, width: 70 , height: 80 },
    { x: 850, y: 400, width: 70 , height: 80 },
    { x: 900, y: 460, width: 70 , height: 80 },
    { x: 850, y: 520, width: 70 , height: 80 },
    { x: 780, y: 520, width: 70 , height: 80 },
    { x: 780, y: 610, width: 70 , height: 80 },
  ],
  colorScheme: {
    background: 0x7A7A7A,
    wall: 0x5A5A5A,
    player: 0xD4D4D4,
    enemy: 0x282828,
    projectile: 0xFFC610,
  },
  playerStart: { x: 20, y: (768 / 2) },
  textOnClear: [],
  images: []
};

export default level;