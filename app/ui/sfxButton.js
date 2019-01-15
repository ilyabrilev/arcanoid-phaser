import FlatButton from './flatButton.js';

export default class SfxButton extends FlatButton {

    constructor(scene) {

        super({scene: scene, img: 'toggle-back'});
        this.setAction(this.btnPressed, this);
        this.pointerYDiff = 1;
        this.onIcon = this.scene.add.image(0,0, 'sfx_on');
        this.offIcon = this.scene.add.image(0,0, 'sfx_off');

        this.back.displayWidth = 30;
        this.back.scaleY = this.back.scaleX;
        this.onIcon.displayWidth = 20;
        this.onIcon.scaleY = this.onIcon.scaleX;
        this.offIcon.displayWidth = 20;
        this.offIcon.scaleY = this.offIcon.scaleX;

        this.add(this.onIcon);
        this.add(this.offIcon);
        this.setIcons();
    }

    btnPressed() {
        session.soundOn = !session.soundOn;
        this.setIcons();
    }

    setIcons() {
        if (session.soundOn) {
            this.onIcon.visible = true;
            this.offIcon.visible = false;
        }
        else {
            this.onIcon.visible = false;
            this.offIcon.visible = true;
        }
    }
}