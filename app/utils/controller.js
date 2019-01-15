export default class Controller {

    /**
     * @param {GameSession} _gameSession
     * @param {Phaser.Events.EventEmitter} _emitter
     */
    constructor(_gameSession, _emitter) {
        this.gameSession = _gameSession;
        this.emitter = _emitter;
        this.emitter.on(msgs.INC_SCORE, this.IncScore, this);
        this.emitter.on(msgs.SET_LIVES, this.SetLives, this);
    }

    IncScore(score) {
        this.gameSession.score += score;
    }

    SetLives(lives) {
        this.gameSession.lives = lives;
    }
}