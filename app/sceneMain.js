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

        this.ball = this.physics.add.sprite(game.config.width/2, game.config.height - 27, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.body.allowGravity = false;
        this.ball.body.setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.sprite(game.config.width/2, game.config.height - 10, 'paddle').setImmovable();
        this.paddle.body.allowGravity = false;

        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
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

    hitPaddle(ball, paddle)
    {
        let diff = 0;

        if (ball.x < paddle.x)
        {
            //Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //Ball is perfectly in the middle
            //Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    hitBrick(ball, brick)
    {
        brick.disableBody(true, true);
    }
}