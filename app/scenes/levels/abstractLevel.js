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
    }

    create()
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(session, emitter);
        this.mediaManager = new MediaManager(this);

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
        this.pauseButton.x = game.config.width - 30;
        this.pauseButton.y = 60;

        this.sfxBtn = new SfxBtn(this);
        this.sfxBtn.x = game.config.width - 30;
        this.sfxBtn.y = 60 + 40;

        this.bricks = this.LevelBuild();

        this.ball = new Ball(this, game);
        this.paddle = new Paddle(this, game);

        this.physics.add.collider(this.ball, this.paddle, this.paddle.HitPaddle, null, this.paddle);
        this.physics.add.collider(this.ball, this.bricks, this.HitBrick, null, this);
        this.physics.world.on('worldbounds', this.onWorldBounds);

        this.RegisterInput();

        emitter.on(msgs.GAME_PAUSED, this.gamePaused, this);
        emitter.on(msgs.LEVEL_COMPLETED, this.startNextLevel, this);
        emitter.on(msgs.LEVEL_BOMB_DROPPED, this.explodeEverything, this);
        emitter.on(msgs.EXPLODE_EXPOSIVE, this.explodeExplosive, this);
    }

    onWorldBounds(body) {
        emitter.emit(msgs.PLAY_SOUND, 'bhit', 0.25);
    }

    gamePaused() {
        if (this.isPausePermitted) {
            game.scene.getScene('PauseScene').setPrevScene(this.sceneName);
            this.scene.launch('PauseScene');
            this.scene.pause();
        }
    }

    explodeExplosive() {
        this.bricks.getChildren().forEach(function (brick) {
            if (brick instanceof ExplosiveBrick) {
                brick.HitBrick(null);
            }
        });
        setTimeout(this.CheckLevelPassed, 250, this)
    }

    explodeEverything() {
        this.bricks.getChildren().forEach(function (brick) {
            brick.HitBrick(null);
        });
        setTimeout(this.CheckLevelPassed, 250, this)
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

    GetLevelBuildConsts() {
        let lc = {};
        lc.bW = 48;
        lc.bH = 24;
        lc.yOffset = 148;
        lc.yBrickCount = 12;
        lc.xOffset = Math.round((game.config.width - lc.bW*lc.yBrickCount)/2);
        return lc;
    }
}