class Level2 extends AbstractLevel {

    constructor()
    {
        super('Level2', 'SceneGameVictory');
    }

    LevelBuild()
    {
        let bricks = this.physics.add.staticGroup();
        let stripedBrickNegArr = [0, 1, 10, 11];
        let genericBrickNegArr = [0, 1, 2, 3, 8, 9, 10, 11];
        for (let i = 0; i < 12; i++)
        {
            if (!genericBrickNegArr.includes(i)) {
                new GenericBrick(bricks, this, 75 + i * 46, 148 - 27 * 2, 'orangeBrick');
            }
            if (!stripedBrickNegArr.includes(i)) {
                new StripedBrick(bricks, this, 75 + i * 46, 148 - 27);
            }
            new GenericBrick(bricks, this, 75 + i*46, 148, 'orangeBrick');
            if (!stripedBrickNegArr.includes(i)) {
                new StripedBrick(bricks, this, 75 + i * 46, 148 + 27);
            }
            if (!genericBrickNegArr.includes(i)) {
                new GenericBrick(bricks, this, 75 + i * 46, 148 + 27 * 2, 'orangeBrick');
            }
        }
        return bricks;
    }
}