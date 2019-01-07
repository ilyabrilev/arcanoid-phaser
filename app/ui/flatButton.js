class FlatButton extends Phaser.GameObjects.Container {

    constructor(conf) {
        super(conf.scene);

        this.pointerYDiff = 5;
        this.scene = conf.scene;

        this.back = this.scene.add.image(0, 0, conf.img);
        this.add(this.back);

        if (conf.text) {
            this.text1 = this.scene.add.text(0, 0, conf.text);
            this.text1.setOrigin(0.5, 0.5);
            this.add(this.text1);
        }

        this.scene.add.existing(this);

        if (conf.onPressed) {
            this.setAction(conf.onPressed);
        }

        this.back.on('pointerover', this.pointerover, this);
        this.back.on('pointerout', this.pointerout, this);
    }

    setAction(action, context = this.scene) {
        this.back.setInteractive();
        this.back.on('pointerup', action, context);
    }

    pointerover() {
        this.y -= this.pointerYDiff;
    }

    pointerout() {
        this.y += this.pointerYDiff;
    }

}