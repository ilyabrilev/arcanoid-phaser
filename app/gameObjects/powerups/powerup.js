export default class Powerup extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, ball, key) {
        super(scene, ball.x, ball.y, key);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setVelocity(ball.body.velocity.x + 50, -(ball.body.velocity.y + 50));
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1);
        this.displayWidth = 48;
        this.scaleY = this.scaleX;
        this.width = 48 - 10;
    }

    Activate() {
        session.score += 50;
    }

    DestroyC() {
        this.scene.ClearPowerup();
        this.destroy();
    }
}