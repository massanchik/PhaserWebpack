import Phaser from 'phaser';
import CatcherPrefab from './prefabs/catcher';
import CatPrefab from './prefabs/cat';

export default class Game extends Phaser.State {
    constructor() {
        super();
        this.score = 0;
        this.padding = {
            left: 62,
            right: 50,
            top: 40,
            bottom: 60,
        };
    }
    preload() {
    }
    create() {
        this.add.sprite(0, 0, 'bg');

        this.catcher = new CatcherPrefab(this.game, 400, 300, null, this.padding);
        this.add.existing(this.catcher);

        this.cat = new CatPrefab(this.game, 0, 0, null, this.padding);
        this.add.existing(this.cat);

        this.txtScore = this.add.text(10, 10, this.score.toString(), {
            font: '20px Arial',
            fill: '#fff',
        });
    }
    update() {
        this.physics.arcade.overlap(this.catcher, this.cat, this.catHitHandler, null, this);
    }
    drawScore() {
        this.txtScore.text = this.score.toString();
    }
    catHitHandler() {
        if (this.cat.catIsMoving) return;
        this.score += 1;
        this.drawScore();
        this.cat.resetCat();
    }
};