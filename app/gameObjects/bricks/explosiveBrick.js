import AbstractBrick from './abstractBrick.js';

export default class ExplosiveBrick extends AbstractBrick {

    constructor(brickCollection, scene, x, y) {
        super(brickCollection, scene, x, y, 'explosiveBrick');
        this.brickCollection = brickCollection;
        this.scene = scene;
        this.scoreCost = 25;
        this.aboutToExplode = false;
    }

    HitBrick(ball)
    {
        if (this.aboutToExplode) {
            return;
        }
        this.aboutToExplode = true;

        this.brickCollection.getChildren().forEach(function (brick) {
            if ((brick !== this) && this.body.gameObject.active) {
                if (((Math.abs(brick.x - (this.x + this.displayWidth)) < 2 ) ||
                    (Math.abs(brick.x + brick.displayWidth - this.x) < 2 ) ||
                    (Math.abs(brick.x - this.x) < 2 ))               &&
                    ((Math.abs(brick.y - (this.y + this.displayHeight)) < 2 ) ||
                    (Math.abs(brick.y + brick.displayHeight - this.y) < 2 ) ||
                    (Math.abs(brick.y - this.y) < 2 )))
                {
                    brick.HitBrick(null);
                }
            }
        }, this);

        this.disableBody(true, true);
        emitter.emit(msgs.PLAY_SOUND, 'click');
        session.score += this.scoreCost
    }
}