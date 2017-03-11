import Phaser from 'phaser';

export default class BarPrefab extends Phaser.Group {
    constructor(game, x, y, barImg, holderImg) {
        super(game);

        this.x = x;
        this.y = y;

        this.bar = this.create(0, 0, barImg);
        this.holder = this.create(0, 0, holderImg);
    }
    setValue(val) {
        if (this.tween) this.tween.stop();
        this.tween = this.game.add.tween(this.bar.scale);
        this.tween.to({x: val}, 350);
        this.tween.start();
    }
};