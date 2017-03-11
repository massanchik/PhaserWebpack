import Phaser from 'phaser';

export default class EnemyPrefab extends Phaser.Sprite {
    constructor(game, x, y, frame, bullets) {
        super(game, x, y, 'enemy', frame);
        this.bullets = bullets;
        this.score = 5;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.velocity.x = -175;
        this.bounceTick = Math.random() * 2;

        this.outOfBoundsKill = true;
        this.willFire = Phaser.Utils.chanceRoll(50);

        if (this.willFire) {
            this.fireTimer = this.game.time.create(false);
            this.fireTimer.add(3500, this.fireShot, this);
            this.fireTimer.start();
        }
    }
    update() {
        this.bounceTick += .02;
        let moveY = Math.sin(this.bounceTick) * 1.5;
        if (
            (this.y + this.height < this.game.height && moveY > 0) ||
            (this.y - this.height > 0 && moveY < 0)
        ) {
            this.y += moveY;
        }
    }
    fireShot() {
        let bullet = this.bullets.create(this.x, this.y, 'enemyBullet');
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.outOfBoundsKill = true;
        bullet.checkWorldBounds = true;
        bullet.body.velocity.x = -250;
    }
};