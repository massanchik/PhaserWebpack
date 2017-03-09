import Phaser from 'phaser';

export default class Catcher extends Phaser.Sprite {
    constructor(game, x, y, frame, padding) {
        super(game, x, y, 'catcher', frame);
        this.padding = padding;
        this.speed = 5;
        this.scale.setTo(1.5);
        this.anchor.setTo(.5, 0);
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
    }
    update() {
        let moveX = 0;
        let moveY = 0;

        if (this.cursor.left.isDown) {
            moveX = -this.speed;
            this.scale.x = Math.abs(this.scale.x);
        }
        if (this.cursor.right.isDown) {
            moveX = this.speed;
            this.scale.x = -Math.abs(this.scale.x);
        }
        if (this.cursor.up.isDown) {
            moveY = -this.speed;
        }
        if (this.cursor.down.isDown) {
            moveY = this.speed;
        }
        if (moveX || moveY) {
            this.moveCatcher(moveX, moveY);
        }
    }
    moveCatcher(x, y) {
        let newX = this.x + x;
        let newY = this.y + y;
        let width = Math.abs(this.width / 2);

        if (newX < this.game.width - this.padding.right - width && newX > this.padding.left + width) {
            this.x = newX;
        }
        if (newY < this.game.height - this.padding.bottom - Math.abs(this.height) && newY > this.padding.top) {
            this.y = newY;
        }
    }
};