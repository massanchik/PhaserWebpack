import Phaser from 'phaser';

export default class Preload extends Phaser.State {
    preload() {
        this.asset = null;
        this.ready = false;

        this.load.image('loading_bg', 'assets/img/loading_bg.jpg');
        this.load.image('cat', '/assets/img/cat.png');
        this.load.image('catcher', '/assets/img/catcher.png');
        this.load.image('bg', '/assets/img/bg.png');
    }
    create() {
        this.add.sprite(0, 0, "loading_bg");

        this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        this.load.start();
    }
    update() {
        if (this.ready) {
            this.game.state.start('game');
        }
    }
    onLoadComplete() {
        this.ready = true;
    }
};