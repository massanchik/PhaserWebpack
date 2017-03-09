import Phaser from 'phaser';

export default class CatPrefab extends Phaser.Sprite {
    constructor(game, x, y, frame, padding) {
        super(game, x, y, 'cat', frame);
        this.padding = padding;
        this.catIsMoving = false;
        this.scale.setTo(2);
        this.resetCat();
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
    }
    resetCat() {
        if (this.catIsMoving) return;
        this.catIsMoving = true;
        let x = this.game.rnd.integerInRange(this.padding.left, this.game.width - this.padding.right - Math.abs(this.width));
        let y = this.game.rnd.integerInRange(this.padding.top, this.game.height - this.padding.bottom - Math.abs(this.height));
        this.game.add.tween(this).to({x, y}, 200, Phaser.Easing.Quadratic.Out, true)
            .onComplete.add(this.catTweenComplete, this);
    }
    catTweenComplete() {
        this.catIsMoving = false;
    }
};