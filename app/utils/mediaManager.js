class MediaManager {

    constructor(scene) {
        this.scene = scene;
        this.sounds = [];
        emitter.on(msgs.PLAY_SOUND, this.PlaySound, this);
    }

    PlaySound(key, volume = 1) {
        if (session.soundOn) {
            let sound;
            if (!(key in this.sounds)) {
                sound = this.scene.sound.add(key, {volume: volume});
                this.sounds[key] = sound;
            } else {
                sound = this.sounds[key];
            }
            sound.play();
        }
    }

    SetBackgroundMusic(key, volume = 1) {
        if (session.musicOn) {
            let bg = this.scene.sound.add(key, {volume: volume, loop: true});
            bg.play();
        }
    }

}