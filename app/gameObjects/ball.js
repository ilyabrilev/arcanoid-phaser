export default class Ball extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, _game) {
        super(scene, _game.config.width/2, _game.config.height - 27, 'ball');
        this.game = _game;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        this.body.setBounce(1);
        this.body.onWorldBounds = true;
        this.setData('onPaddle', true);
    }

    ResetBall() {
        this.x = this.game.config.width/2;
        this.y = this.game.config.height - 27;
        this.setVelocity(0, 0);
        this.setData('onPaddle', true);
    }
}