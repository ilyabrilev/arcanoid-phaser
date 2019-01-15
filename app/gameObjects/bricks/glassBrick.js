import AbstractBrick from './abstractBrick.js';

export default class GlassBrick extends AbstractBrick {

    constructor(brickCollection, scene, x, y) {
        super(brickCollection, scene, x, y, 'glassBrick');
        this.scoreCost = 10;
        this.visible = false;
    }

    HitBrick(ball)
    {
        emitter.emit(msgs.PLAY_SOUND, 'click');
        session.score += this.scoreCost;
        this.scene.GeneratePowerup(ball);
        if (!this.visible && this.body.gameObject.active) {
            this.visible = true;
        }
        else {
            this.disableBody(true, true);
        }
    }
}