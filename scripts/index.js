import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        },
        debug: true
    },
    scene: [BootScene, GameScene]
};

var game = new Phaser.Game(config);