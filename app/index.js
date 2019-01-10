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
                gravity: { y: 200 },
                debug: false
            },
        },
        scene: [
            new SceneLoad(),
            new SceneTitle(),
            new Level1(),
            new Level2(),
            new SceneGameOver(),
            new PauseScene(),
            new SceneGameVictory()
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
