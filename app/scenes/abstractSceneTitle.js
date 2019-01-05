class AbstractSceneTitle extends Phaser.Scene {

    constructor(sceneStr, textButton)
    {
        super(sceneStr);
        this.textButton = textButton;
    }
    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('btn', 'assets/ui/buttons/2/5.png');
    }

    create()
    {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(session, emitter);

        this.add.image(400, 300, 'sky');
        this.add.image(game.config.width/2, game.config.height/2 - 50, 'title');
        let startBtn = new FlatButton({scene: this, img: 'btn', text: this.textButton, onPressed: this.startBtnPressed });
        startBtn.x = game.config.width/2;
        startBtn.y = game.config.height/2 + 75;
    }

    update() {}

    startBtnPressed()
    {
        this.scene.start('SceneMain');
    }
}