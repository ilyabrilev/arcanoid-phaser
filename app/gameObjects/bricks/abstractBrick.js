class AbstractBrick extends Phaser.Physics.Arcade.Sprite{

    constructor(brickCollection, scene, x, y, key) {
        super(scene, x, y, key);

        this.setOrigin(0,0);
        this.scoreCost = 10;
        this.displayWidth = 48;
        this.scaleY = this.scaleX;

        if (brickCollection) {
            brickCollection.add(this);
        }
        scene.add.existing(this);
    }

    HitBrick(ball)
    {
        this.disableBody(true, true);
        emitter.emit(msgs.PLAY_SOUND, 'click');
        session.score += this.scoreCost;
    }

}