class SceneMain extends Phaser.Scene {

    constructor()
    {
        super('SceneMain');
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ball', 'assets/ball-casual.png');
        this.load.image('paddle', 'assets/paddle.png');
        this.load.image('brick1', 'assets/brick1.png');
        this.load.image('brick2', 'assets/brick2.png');
    }

    create()
    {
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 300, 'sky');

        this.bricks = this.physics.add.staticGroup().createMultiple([
            { key: 'brick1', frame: 0, repeat: 10, setXY: { x: 84, y: 148, stepX: 50 } },
            { key: 'brick2', frame: 0, repeat: 10, setXY: { x: 84, y: 148 + 27, stepX: 50 } },
        ]);

        this.ball = Ball.GetBall(this, game);
        this.paddle = Paddle.GetPaddle(this, game);

        this.physics.add.collider(this.ball, this.paddle, Paddle.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

        this.input.on('pointermove', function (pointer) {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            if (this.ball.getData('onPaddle'))
            {
                this.ball.x = this.paddle.x;
            }
        }, this);

        this.input.on('pointerup', function (pointer) {
            if (this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(-200, -200);
                this.ball.setData('onPaddle', false);
            }
        }, this);
    }

    update()
    {
        if (this.ball.y > 600)
        {
            this.ball.y = 10;
            this.ball.disableBody(true, true);
            console.log('game over');
        }
    }

    hitBrick(ball, brick)
    {
        brick.disableBody(true, true);
    }
}