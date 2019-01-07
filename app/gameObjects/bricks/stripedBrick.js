class StripedBrick extends AbstractBrick {

    constructor(brickCollection, scene, x, y) {
        super(brickCollection, scene, x, y, 'stripedBrick');
    }

    HitBrick(ball)
    {
        super.HitBrick(ball);
        console.log('stripedBrick hit');
    }
}