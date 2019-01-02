class Ball {

    static GetBall(_scene, _game) {
        let ball = _scene.physics.add.sprite(_game.config.width/2, _game.config.height - 27, 'ball');
        ball.setCollideWorldBounds(true);
        ball.body.allowGravity = false;
        ball.body.setBounce(1);
        ball.setData('onPaddle', true);
        return ball;
    }

    static ResetBall(ball, _game) {
        ball.x = _game.config.width/2;
        ball.y = _game.config.height - 27;
        ball.setVelocity(0, 0);
        ball.setData('onPaddle', true);
    }
}