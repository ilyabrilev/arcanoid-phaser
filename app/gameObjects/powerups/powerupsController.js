import PlusLifePowerup from './plusLifePowerup.js';
import MinusLifePowerup from './minusLifePowerup.js';

export default class PowerupsController {
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
}