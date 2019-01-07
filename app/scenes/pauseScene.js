class PauseScene extends Phaser.Scene {

    constructor(prevScene)
    {
        super('PauseScene');
        this.textButton = 'Resume';
        this.prevScene = prevScene;
    }

    preload()
    {
        this.load.image('title', 'assets/title.png');
        this.load.image('btn', 'assets/ui/buttons/2/5.png');
    }

    create()
    {
        let startBtn = new FlatButton({scene: this, img: 'btn', text: this.textButton, onPressed: this.startBtnPressed });
        startBtn.x = game.config.width/2;
        startBtn.y = game.config.height/2 + 75;
    }

    startBtnPressed()
    {
        this.scene.resume(this.prevScene);
        this.scene.stop();
    }

    setPrevScene(prevScene) {
        this.prevScene = prevScene;
    }
}