class PlusLifePowerup extends Powerup {

    constructor(scene, ball) {
        super(scene, ball, 'plus_life', '+1');
    }

    Activate() {
        super.Activate();
        session.lives += 1;
        this.DestroyC();
    }
}