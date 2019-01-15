import EmitterMsgs from './utils/emitterMsgs.js';

import GameSession from './gameSession.js';
import SceneLoad from './scenes/sceneLoad.js';
import SceneTitle from './scenes/sceneTitle.js';
import Level1 from './scenes/levels/level1.js';
import Level2 from './scenes/levels/level2.js';
import SceneGameOver from './scenes/sceneGameOver.js';
import PauseScene from './scenes/pauseScene.js';
import SceneGameVictory from './scenes/sceneGameVictory.js';

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
