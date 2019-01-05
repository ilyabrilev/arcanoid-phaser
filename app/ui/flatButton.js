class FlatButton extends Phaser.GameObjects.Container {

    constructor(conf) {
        super(conf.scene);

        this.scene = conf.scene;

        this.back = this.scene.add.image(0, 0, conf.img);
        this.add(this.back);

        this.text1 = this.scene.add.text(0, 0, conf.text);
        this.text1.setOrigin(0.5, 0.5);
        this.add(this.text1);

        this.scene.add.existing(this);

        this.back.setInteractive();
        this.back.on('pointerup', conf.onPressed, conf.scene);

        this.back.on('pointerover', this.pointerover, this);
        this.back.on('pointerout', this.pointerout, this);
    }

    pointerover() {
        this.y -= 5;
    }

    pointerout() {
        this.y += 5;
    }

}