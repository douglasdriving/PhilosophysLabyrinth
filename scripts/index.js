import BootScene from './BootScene.js';
import GameScene from './GameScene.js';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [BootScene, GameScene]
};

var game = new Phaser.Game(config);