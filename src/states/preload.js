import Phaser from 'phaser';

export default class Preload extends Phaser.State {
    preload() {
        this.asset = null;
        this.ready = false;

        this.load.image('loading_bg', 'assets/img/loading_bg.jpg');
        this.load.image('enemy', '/assets/img/enemy.png');
        this.load.image('explosion', '/assets/img/explosion.png');
        this.load.spritesheet('player', '/assets/img/gunbot.png', 214, 268);
        this.load.image('hexagon', '/assets/img/hexagon_particle.png');
        this.load.image('bullet', '/assets/img/bullet.png');
        this.load.image('enemyBullet', '/assets/img/enemyBullet.png');
        this.load.image('bg', '/assets/img/bg.jpg');
        this.load.image('health_bar', '/assets/img/health_bar.png');
        this.load.image('health_holder', '/assets/img/health_holder.png');
        this.load.image('circle', '/assets/img/circle.png');
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
            this.game.state.start('start');
        }
    }
    onLoadComplete() {
        this.ready = true;
    }
};