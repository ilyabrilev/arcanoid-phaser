class Bar extends Phaser.GameObjects.Container {

    constructor(conf) {
        super(conf.scene);
        this.scene = conf.scene;
        if (!conf.color) {
            this.color = 0xffffff;
        }
        else {
            this.color = conf.color;
        }
        if (!conf.width) {
            this.width = 200;
        }
        else {
            this.width = conf.width;
        }
        if (!conf.height) {
            this.height = this.width/4;
        }
        else {
            this.height = conf.height;
        }
        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(this.color, 1);
        this.graphics.fillRect(0, 0, this.width, this.height)
        this.add(this.graphics);
        this.graphics.x = -this.width/2;
        this.graphics.y = -this.height/2;

        this.scene.add.existing(this);
    }

    setPrercent(percent) {
        this.graphics.scaleX = percent;
    }

}