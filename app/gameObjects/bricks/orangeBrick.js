class OrangeBrick extends AbstractBrick {

    constructor(brickCollection, scene, x, y) {
        super(brickCollection, scene, x, y, 'orangeBrick');

        this.scoreCost = 25;
    }

    HitBrick(ball)
    {
        super.HitBrick(ball);
        console.log('orangeBrick hit');
    }
}