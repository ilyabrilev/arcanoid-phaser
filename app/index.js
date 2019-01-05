var game;
var session;
var emitter;
var msgs;
var controller;

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
        scene: [
            new SceneTitle(),
            new SceneMain(),
            new SceneGameOver()
        ],
    };

    class Game extends Phaser.Game {
        constructor() {
            super(config);
        }
    }

    session = new GameSession();
    msgs = new EmitterMsgs();
    game = new Game();

};
