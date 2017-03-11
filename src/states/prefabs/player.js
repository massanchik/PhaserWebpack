import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
    constructor(game, x, y, frame, bullets) {
        super(game, x, y, 'player', frame);
        this.speed = 150;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.drag.x = 35;
        this.body.drag.y = 35;
        this.cursor = this.game.input.keyboard.createCursorKeys();

        this.health = 10;
        this.maxHealth = 10;

        this.scale.setTo(.5, .5);
        this.bulletGate = 0;
        this.shootInterval = 500;
        this.bullets = bullets;
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.firePosition = {x: this.width/2, y: this.height/2 - 30};
        this.fireAnimation = this.animations.add('fly', [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
        this.fireAnimation = this.animations.add('fire', [11, 12, 13]);
        this.fireAnimation.onComplete.add(this.playFly, this);

        this.playFly();
    }
    update() {
        if (this.cursor.left.isDown) {
            this.body.velocity.x = -this.speed;
        }
        if (this.cursor.right.isDown) {
            this.body.velocity.x = this.speed;
        }
        if (this.cursor.up.isDown) {
            this.body.velocity.y = -this.speed;
        }
        if (this.cursor.down.isDown) {
            this.body.velocity.y = this.speed;
        }
        if (this.fireButton.isDown) {
            this.fire();
        }
    }
    fire() {
        if (this.game.time.now < this.bulletGate) return;

        let bullet = this.bullets.getFirstDead();
        if (bullet) {
            bullet.x = this.x + this.firePosition.x;
            bullet.y = this.y + this.firePosition.y;
            bullet.revive();
        } else {
            bullet = this.bullets.create(
                this.x + this.firePosition.x,
                this.y + this.firePosition.y,
                'bullet'
            );
            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.outOfBoundsKill = true;
            bullet.checkWorldBounds = true;
            bullet.body.velocity.x = 500;
        }

        this.bulletGate = this.game.time.now + this.shootInterval;
        this.animations.play('fire');
    }
    playFly() {
        this.animations.play('fly', 14, true);
    }
    damege(amount) {
        this.health -= amount;
    }
};