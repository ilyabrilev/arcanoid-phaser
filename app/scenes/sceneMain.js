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
        this.load.image('stripedBrick', 'assets/stripedBrick.png');
        this.load.image('orangeBrick', 'assets/orangeBrick.png');
    }

    create()
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(session, emitter);

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 300, 'sky');

        this.scoreBox = new ScoreBox({scene: this});
        this.scoreBox.x = 20;
        this.scoreBox.y = 10;

        this.scoreBox = new LivesBox({scene: this});
        this.scoreBox.x = game.config.width - 20;
        this.scoreBox.y = 10;

        this.bricks = this.LevelBuild();
        this.ball = new Ball(this, game);
        this.paddle = new Paddle(this, game);


        console.log(this.bricks);

        this.physics.add.collider(this.ball, this.paddle, this.paddle.HitPaddle, null, this.paddle);
        this.physics.add.collider(this.ball, this.bricks, this.HitBrick, null, this);

        this.RegisterInput();
    }

    update()
    {
        if (this.ball.y > 600)
        {
            if (session.lives > 0) {
                this.ball.ResetBall();
                this.paddle.ResetPaddle();
                session.lives--;
            }
            else {
                this.ball.y = 10;
                this.ball.disableBody(true, true);
                this.scene.start('SceneGameOver');
            }
        }
    }

    HitBrick(ball, brick)
    {
        brick.HitBrick(ball);
    }

    LevelBuild()
    {
        let bricks = this.physics.add.staticGroup();
        for (let i = 0; i < 11; i++)
        {
            new OrangeBrick(bricks, this, 84 + i*50, 148);
            new StripedBrick(bricks, this, 84 + i*50, 148 + 27);
        }
        return bricks;
    }

    RegisterInput() {

        this.input.on('pointermove', function (pointer) {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 32, game.config.width - 32);
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
}