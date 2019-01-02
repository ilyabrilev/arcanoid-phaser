class Paddle {

    /**
     *
     * @param {Phaser.Scene} _scene
     * @param {Phaser.Game} _game
     * @constructor
     */
    static GetPaddle(_scene, _game) {
        let paddle = _scene.physics.add.sprite(_game.config.width/2, _game.config.height - 10, 'paddle').setImmovable();
        paddle.body.allowGravity = false;
        return paddle;
    }

    static hitPaddle(ball, paddle)
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

    static ResetPaddle(paddle, game) {
        paddle.x = game.config.width/2;
        paddle.y = game.config.height - 10;
    }

}