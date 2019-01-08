class AbstractLevel extends Phaser.Scene {

    constructor(sceneName, nextLevel)
    {
        super(sceneName);
        this.sceneName = sceneName;
        this.isPausePermitted = true;
        this.nextLevel = nextLevel;
        this.startNextLevelLock = false;
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
        emitter.on(msgs.LEVEL_COMPLETED, this.startNextLevel, this);
        //emitter.on(msgs.LEVEL_BOMB_DROPPED, this.startNextLevel, this);
    }

    gamePaused() {
        if (this.isPausePermitted) {
            game.scene.getScene('PauseScene').setPrevScene(this.sceneName);
            this.scene.launch('PauseScene');
            this.scene.pause();
        }
    }

    startNextLevel() {
        if (!this.startNextLevelLock) {
            this.startNextLevelLock = true;
            console.log('Next Level started');
            this.scene.start(this.nextLevel);
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

    HitBrick(ball, brick)
    {
        brick.HitBrick(ball);
        setTimeout(this.CheckLevelPassed, 250, this)
    }

    CheckLevelPassed(scene) {
        if (scene.bricks.countActive() <= 0) {
            emitter.emit(msgs.LEVEL_COMPLETED);
        }
    }

    LevelBuild()
    {
        return this.physics.add.staticGroup();
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