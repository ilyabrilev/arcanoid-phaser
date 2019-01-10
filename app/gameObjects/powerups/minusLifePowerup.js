class MinusLifePowerup extends Powerup {

    constructor(scene, ball) {
        super(scene, ball, 'minus_life', '-1');
    }

    Activate() {
        super.Activate();
        this.scene.BallLost();
        this.DestroyC();
    }
}