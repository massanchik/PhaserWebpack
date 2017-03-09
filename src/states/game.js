import Phaser from 'phaser';

export default class Game extends Phaser.State {
    constructor() {
        super();
        this.score = 0;
        this.speed = 5;
        this.padding = {
            left: 62,
            right: 50,
            top: 40,
            bottom: 60,
        };
        this.catIsMoving = false;
    }
    preload() {
        this.load.image('cat', '/assets/img/cat.png');
        this.load.image('catcher', '/assets/img/catcher.png');
        this.load.image('bg', '/assets/img/bg.png');
    }
    create() {
        this.add.sprite(0, 0, 'bg');

        this.catcher = this.add.sprite(400, 300, 'catcher');
        this.catcher.scale.setTo(1.5);
        this.catcher.anchor.setTo(.5, 0);

        this.cat = this.add.sprite(0, 0, 'cat');
        this.cat.scale.setTo(2);
        this.resetCat();

        this.txtScore = this.add.text(10, 10, this.score.toString(), {
            font: '20px Arial',
            fill: '#fff',
        });
        this.cursor = this.input.keyboard.createCursorKeys();
        this.physics.enable(this.catcher, Phaser.Physics.ARCADE);
        this.physics.enable(this.cat, Phaser.Physics.ARCADE);
    }
    update() {
        let moveX = 0;
        let moveY = 0;

        if (this.cursor.left.isDown) {
            moveX = -this.speed;
            this.catcher.scale.x = Math.abs(this.catcher.scale.x);
        }
        if (this.cursor.right.isDown) {
            moveX = this.speed;
            this.catcher.scale.x = -Math.abs(this.catcher.scale.x);
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

        this.physics.arcade.overlap(this.catcher, this.cat, this.catHitHandler, null, this);
    }
    drawScore() {
        this.txtScore.text = this.score.toString();
    }
    catHitHandler() {
        if (this.catIsMoving) return;
        this.score += 1;
        this.drawScore();
        this.resetCat();
    }
    resetCat() {
        if (this.catIsMoving) return;
        this.catIsMoving = true;
        let x = this.rnd.integerInRange(this.padding.left, this.game.width - this.padding.right - Math.abs(this.cat.width));
        let y = this.rnd.integerInRange(this.padding.top, this.game.height - this.padding.bottom - Math.abs(this.cat.height));
        this.add.tween(this.cat).to({x, y}, 200, Phaser.Easing.Bounce.Out, true)
            .onComplete.add(this.catTweenComplete, this);
    }
    catTweenComplete() {
        this.catIsMoving = false;
    }
    moveCatcher(x, y) {
        let newX = this.catcher.x + x;
        let newY = this.catcher.y + y;
        let width = Math.abs(this.catcher.width / 2);

        if (newX < this.game.width - this.padding.right - width && newX > this.padding.left + width) {
            this.catcher.x = newX;
        }
        if (newY < this.game.height - this.padding.bottom - Math.abs(this.catcher.height) && newY > this.padding.top) {
            this.catcher.y = newY;
        }
    }
};