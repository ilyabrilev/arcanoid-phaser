class LivesBox extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.labelPrefix = 'LIVES: ';

        this.text1 = this.scene.add.text(0,0, this.labelPrefix + session.lives);
        this.text1.setOrigin(1, 0);
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(msgs.LIVESS_UPDATED, this.livesUpdated, this);
    }

    livesUpdated(lives) {
        this.text1.setText(this.labelPrefix + lives);
    }
}