class Powerup extends Phaser.Physics.Arcade.Sprite {

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
        console.log(this);
    }

    static GetRandom(scene, ball) {
        const chancesArr = {
            PlusLifePowerup: {
                bChance: 60,
                uChance: 79,
                _class: PlusLifePowerup
            },
            MinusLifePowerup: {
                bChance: 80,
                uChance: 100,
                _class: MinusLifePowerup
            },
        };

        let rnd = Math.floor(Math.random() * 100);

        for (let key in chancesArr) {
            if ((chancesArr[key].bChance <= rnd) && (rnd <= chancesArr[key].uChance)) {
                return new chancesArr[key]._class(scene, ball);
            }
        }
        return null;
    }

    Activate() {
        console.log('powerup collected');
        session.score += 50;
    }

    DestroyC() {
        this.scene.ClearPowerup();
        this.destroy();
    }
}