import AbstractLevel from './abstractLevel.js';
import GenericBrick from '../../gameObjects/bricks/genericBrick.js';
import StripedBrick from '../../gameObjects/bricks/stripedBrick.js';
import GlassBrick from '../../gameObjects/bricks/glassBrick.js';
import ExplosiveBrick from '../../gameObjects/bricks/explosiveBrick.js';

export default class Level2 extends AbstractLevel {

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
        let middlleBrickNegArr = [4, 5, 6, 7];
        for (let i = 0; i < lc.yBrickCount; i++)
        {
            if (!genericBrickNegArr.includes(i)) {
                new GenericBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset - lc.bH * 2, 'orangeBrick');
            }
            if (!stripedBrickNegArr.includes(i)) {
                new GlassBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset - lc.bH);
            }
            if (!middlleBrickNegArr.includes(i)) {
                new GenericBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset, 'orangeBrick');
            }
            else {
                new ExplosiveBrick(bricks, this, lc.xOffset + i * lc.bW, lc.yOffset);
            }
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