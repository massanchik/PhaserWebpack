import Phaser from 'phaser';

export default class Boot extends Phaser.State {
    preload() {
        this.load.image('preloader', '/assets/img/loading_bar.png');
    }
    create() {
        this.input.maxPointers = 1;
        this.game.state.start('preload');
    }
};