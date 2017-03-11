import Phaser from 'phaser';

export default class End extends Phaser.State {
    create() {
        let style = {
            font: '50px Arial',
            align: 'center',
            fill: '#fff',
        };
        this.add.text(200, this.game.height / 2, 'Game Over. Press Spacebar', style);
    }
    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('start');
        }
    }
};