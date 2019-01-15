export default class GameSession {
    constructor(_inputLives = 1) {
        this.score = 0;
        this.lives = _inputLives;
        this.soundOn = false;
        this.musicOn = false;
    }

    get lives() {
        return this._lives;
    }

    set lives(value) {
        this._lives = value;
        if (emitter) {
            if (this._lives >= 0) {
                emitter.emit(msgs.LIVESS_UPDATED, this._lives);
            }
            else {
                emitter.emit(msgs.GAME_OVER);
            }
        }
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        if (emitter) {
            emitter.emit(msgs.SCORE_UPDATED, this._score);
        }
    }
}