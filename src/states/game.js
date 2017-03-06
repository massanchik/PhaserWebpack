export default {
    preload() {
        this.load.image('cat', '/assets/img/cat.png');
        this.load.image('catcher', '/assets/img/catcher.png');
        this.load.image('bg', '/assets/img/bg.png');
    },
    create() {
        this.method = {
            drawScore: () => {
                this.entity.txtScore.text = this.data.score.toString();
            },
            catHitHandler: () => {
                this.data.score += 10;
                this.method.drawScore();
                this.method.resetCat();
            },
            resetCat: () => {
                this.entity.cat.x = Math.random() * this.game.width;
                this.entity.cat.y = Math.random() * this.game.height;
            },
        };
        this.data = {
            score: 0,
        };
        this.entity = {
            bg: this.game.add.sprite(0, 0, 'bg'),
            catcher: this.game.add.sprite(400, 300, 'catcher'),
            cat: this.game.add.sprite(Math.random() * this.game.width, Math.random() * this.game.height, 'cat'),
            txtScore: this.game.add.text(10, 10, this.data.score.toString(), {
                font: '20px Arial',
                fill: '#fff',
            }),
            cursor: this.game.input.keyboard.createCursorKeys(),
        };
        this.entity.catcher.anchor.setTo(.5, 0);
        this.game.physics.enable(this.entity.catcher, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.entity.cat, Phaser.Physics.ARCADE);
    },
    update() {
        if (this.entity.cursor.left.isDown) {
            this.entity.catcher.x -= 5;
            this.entity.catcher.scale.x = 1;
        }
        if (this.entity.cursor.right.isDown) {
            this.entity.catcher.x += 5;
            this.entity.catcher.scale.x = -1;
        }
        if (this.entity.cursor.up.isDown) {
            this.entity.catcher.y -= 5;
        }
        if (this.entity.cursor.down.isDown) {
            this.entity.catcher.y += 5;
        }

        this.game.physics.arcade.overlap(this.entity.catcher, this.entity.cat, this.method.catHitHandler);
    },
};