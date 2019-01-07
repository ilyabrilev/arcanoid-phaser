class StripedBrick extends AbstractBrick {

    constructor(brickCollection, scene, x, y) {
        super(brickCollection, scene, x, y, 'stripedBrick');

        this.scoreCost = 25;
    }
}