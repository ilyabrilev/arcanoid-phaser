import FlatButton from './flatButton.js';

export default class PauseButton extends FlatButton {

    constructor(scene) {
        super({scene: scene, img: 'pauseBtn' });
        this.setAction(this.btnPressed, this);
        this.pointerYDiff = 1;
        this.back.displayWidth = 30;
        this.back.scaleY = this.back.scaleX;
    }

    btnPressed() {
        if (emitter) {
            emitter.emit(msgs.GAME_PAUSED);
        }
    }
}