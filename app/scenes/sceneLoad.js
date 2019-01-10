class SceneLoad extends Phaser.Scene {

    constructor(sceneStr)
    {
        super(sceneStr);
    }

    preload()
    {
        this.bar = new Bar({scene: this, height: 20, width: 200});
        this.bar.x = game.config.width/2;
        this.bar.y = game.config.height/2;

        this.load.on('progress', this.onProgress, this);

        this.load.image('sky', 'assets/sky.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('btn', 'assets/ui/buttons/2/5.png');

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ball', 'assets/ball-casual.png');
        this.load.image('paddle', 'assets/paddle.png');
        this.load.image('stripedBrick', 'assets/bricks/stripedBrick.png');
        this.load.image('orangeBrick', 'assets/bricks/orangeBrick.png');
        this.load.image('glassBrick', 'assets/bricks/glassBrick.png');
        this.load.image('explosiveBrick', 'assets/bricks/explosiveBrick.png');

        this.load.image('pauseBtn', 'assets/ui/buttons/pause-btn.png');
        this.load.image('toggle-back', 'assets/ui/toggles/toggles/3.png');
        this.load.image('sfx_on', 'assets/ui/toggles/icons/sfx_on.png');
        this.load.image('sfx_off', 'assets/ui/toggles/icons/sfx_off.png');

        this.load.audio('click', ['assets/sounds/click.mp3', 'assets/sounds/click.ogg']);
        this.load.audio('dland', ['assets/sounds/dland_hint.mp3', 'assets/sounds/dland_hint.ogg']);
        this.load.audio('bhit', ['assets/sounds/border-hit.mp3', 'assets/sounds/border-hit.ogg']);
    }

    create()
    {
        this.scene.start('SceneTitle');
    }

    onProgress(value) {
        this.bar.setPrercent(value);
    }

}