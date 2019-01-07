class Level1 extends Phaser.Scene {

    constructor()
    {
        super('Level1');
        this.sceneName = 'Level1';
        this.isPausePermitted = true;
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ball', 'assets/ball-casual.png');
        this.load.image('paddle', 'assets/paddle.png');
        this.load.image('stripedBrick', 'assets/stripedBrick.png');
        this.load.image('orangeBrick', 'assets/orangeBrick.png');

        this.load.image('pauseBtn', 'assets/ui/buttons/pause-btn.png');
    }

    create()
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(session, emitter);

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(400, 300, 'sky');

        this.scoreBox = new ScoreBox(this);
        this.scoreBox.x = 20;
        this.scoreBox.y = 10;

        this.scoreBox = new LivesBox(this);
        this.scoreBox.x = game.config.width - 20;
        this.scoreBox.y = 10;

        this.pauseButton = new PauseButton(this, this.sceneName);
        this.pauseButton.back.displayWidth = 30;
        this.pauseButton.back.scaleY = this.pauseButton.back.scaleX;
        this.pauseButton.x = game.config.width - 30;
        this.pauseButton.y = 60;

        this.bricks = this.LevelBuild();

        this.ball = new Ball(this, game);
        this.paddle = new Paddle(this, game);

        this.physics.add.collider(this.ball, this.paddle, this.paddle.HitPaddle, null, this.paddle);
        this.physics.add.collider(this.ball, this.bricks, this.HitBrick, null, this);

        this.RegisterInput();

        emitter.on(msgs.GAME_PAUSED, this.gamePaused, this);
    }

    gamePaused() {
        if (this.isPausePermitted) {
            game.scene.getScene('PauseScene').setPrevScene(this.sceneName);
            this.scene.launch('PauseScene');
            this.scene.pause();
        }
    }

    update()
    {
        /*
        if (this.keyP.isDown)
        {
            console.log('keyP.isDown');
            emitter.emit(msgs.GAME_PAUSED);
        }
        */

        if (this.ball.y > game.config.height + 18)
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

    pauseBtnPressed() {

    }

    HitBrick(ball, brick)
    {
        brick.HitBrick(ball);
        console.log(this.bricks.countActive());
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