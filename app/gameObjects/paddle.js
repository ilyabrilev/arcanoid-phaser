class Paddle extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, _game) {
        super(scene, _game.config.width/2, _game.config.height - 10, 'paddle');
        this.game = _game;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setImmovable();
        this.body.allowGravity = false;
    }

    HitPaddle(ball)
    {
        let diff = 0;

        if (ball.x < this.x)
        {
            //Ball is on the left-hand side of the paddle
            diff = this.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > this.x)
        {
            //Ball is on the right-hand side of the paddle
            diff = ball.x - this.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //Ball is perfectly in the middle
            //Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }

    ResetPaddle() {
        this.x = this.game.config.width/2;
        this.y = this.game.config.height - 10;
    }

}