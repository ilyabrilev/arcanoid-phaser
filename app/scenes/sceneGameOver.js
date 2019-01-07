class SceneGameOver extends AbstractSceneTitle {

    constructor()
    {
        super('SceneGameOver', 'Start again?');
    }

    create()
    {
        super.create();
        this.text1 = this.add.text(game.config.width/2, game.config.height/2 - 150, 'Game Over', { fontFamily: 'Arial', fontSize: 64 });
        this.text1.setOrigin(0.5, 0.5);
    }

    startBtnPressed()
    {
        session = new GameSession();
        this.scene.start('Level1');
    }
}