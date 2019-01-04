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
        this.ball = Ball.GetBall(this, game);
        this.paddle = Paddle.GetPaddle(this, game);

        this.physics.add.collider(this.ball, this.paddle, Paddle.HitPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.HitBrick, null, this);

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
            if (session.lives > 0) {
                Ball.ResetBall(this.ball, game);
                Paddle.ResetPaddle(this.paddle, game);
                session.lives--;
            }
            else {
                this.ball.y = 10;
                this.ball.disableBody(true, true);
                console.log('game over');
            }
        }
    }

    HitBrick(ball, brick)
    {
        brick.disableBody(true, true);
        session.score += 10;
    }

    LevelBuild()
    {
        return this.physics.add.staticGroup().createMultiple([
            { key: 'brick1', frame: 0, repeat: 10, setXY: { x: 84, y: 148, stepX: 50 } },
            { key: 'brick2', frame: 0, repeat: 10, setXY: { x: 84, y: 148 + 27, stepX: 50 } },
        ]);

    }
}