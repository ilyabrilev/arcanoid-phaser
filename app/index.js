var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 700,
        height: 500,
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: [ new SceneMain() ],
    };

    class Game extends Phaser.Game {
        constructor() {
            super(config);
        }
    }

    game = new Game();

};