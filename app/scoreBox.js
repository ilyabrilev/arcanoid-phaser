class ScoreBox extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.labelPrefix = 'SCORE: ';

        this.text1 = this.scene.add.text(0,0, this.labelPrefix + session.score);
        this.text1.setOrigin(0, 0);
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(msgs.SCORE_UPDATED, this.scoreUpdated, this);
    }

    scoreUpdated(score) {
        this.text1.setText(this.labelPrefix + score);
    }

}