import AbstractLevel from './abstractLevel.js';
import GenericBrick from '../../gameObjects/bricks/genericBrick.js';
import StripedBrick from '../../gameObjects/bricks/stripedBrick.js';
import GlassBrick from '../../gameObjects/bricks/glassBrick.js';

export default class Level1 extends AbstractLevel {

    constructor()
    {
        super('Level1', 'Level2');
    }

    LevelBuild()
    {
        let lc = this.GetLevelBuildConsts();
        let bricks = this.physics.add.staticGroup();
        for (let i = 0; i < lc.yBrickCount; i++)
        {
            new GenericBrick(bricks, this, lc.xOffset + i*lc.bW, lc.yOffset, 'orangeBrick');
            new StripedBrick(bricks, this, lc.xOffset + i*lc.bW, lc.yOffset + lc.bH);
            new GlassBrick(bricks, this, lc.xOffset + i*lc.bW, lc.yOffset + lc.bH*2, 'orangeBrick');
        }
        return bricks;
    }
}