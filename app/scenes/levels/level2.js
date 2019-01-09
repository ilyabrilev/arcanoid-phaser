class Level2 extends AbstractLevel {

    constructor()
    {
        super('Level2', 'SceneGameVictory');
    }

    LevelBuild()
    {
        let lc = this.GetLevelBuildConsts();
        let bricks = this.physics.add.staticGroup();
        let stripedBrickNegArr = [0, 1, 10, 11];
        let genericBrickNegArr = [0, 1, 2, 3, 8, 9, 10, 11];
        for (let i = 0; i < lc.yBrickCount; i++)
        {
            if (!genericBrickNegArr.includes(i)) {
                new GenericBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset - lc.bH * 2, 'orangeBrick');
            }
            if (!stripedBrickNegArr.includes(i)) {
                new StripedBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset - lc.bH);
            }
            new GenericBrick(bricks, this, lc.xOffset + i*lc.bW, lc.yOffset, 'orangeBrick');
            if (!stripedBrickNegArr.includes(i)) {
                new StripedBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset + lc.bH);
            }
            if (!genericBrickNegArr.includes(i)) {
                new GenericBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset + lc.bH * 2, 'orangeBrick');
            }
        }
        return bricks;
    }
}