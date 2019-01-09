class GlassBrick extends AbstractBrick {

    constructor(brickCollection, scene, x, y) {
        super(brickCollection, scene, x, y, 'glassBrick');
        this.scoreCost = 10;
        this.visible = false;
    }

    HitBrick(ball)
    {
        emitter.emit(msgs.PLAY_SOUND, 'click');
        session.score += this.scoreCost;
        if (!this.visible) {
            this.visible = true;
        }
        else {
            this.disableBody(true, true);
        }
    }
}