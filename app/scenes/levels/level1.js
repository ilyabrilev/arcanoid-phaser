class Level1 extends AbstractLevel {

    constructor()
    {
        super('Level1', 'Level2');
    }

    LevelBuild()
    {
        let bricks = this.physics.add.staticGroup();
        for (let i = 0; i < 12; i++)
        {
            new GenericBrick(bricks, this, 75 + i*46, 148, 'orangeBrick');
            new StripedBrick(bricks, this, 75 + i*46, 148 + 27);
            new GenericBrick(bricks, this, 75 + i*46, 148 + 27*2, 'orangeBrick');
        }
        return bricks;
    }
}