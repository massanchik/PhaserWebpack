import Phaser from 'phaser';

export default class Start extends Phaser.State {
    create() {
        let style = {
            font: '50px Arial',
            align: 'center',
            fill: '#fff',
        };
        this.add.text(100, this.game.height / 2, 'Press Spacebar to Start The Game', style);
    }
    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game');
        }
    }
};