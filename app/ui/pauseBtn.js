class PauseButton extends FlatButton {

    constructor(scene) {
        super({scene: scene, img: 'pauseBtn' });
        this.setAction(this.btnPressed, this);
        this.pointerYDiff = 1;
    }

    btnPressed() {
        if (emitter) {
            emitter.emit(msgs.GAME_PAUSED);
        }
    }
}