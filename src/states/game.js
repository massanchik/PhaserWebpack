import Phaser from 'phaser';
import PlayerPrefab from './prefabs/player';
import EnemyPrefab from './prefabs/enemy';
import NumberBoxPrefab from './prefabs/number_box';
import BarPrefab from './prefabs/bar';

export default class Game extends Phaser.State {
    constructor() {
        super();
        this.score = 0;
        this.spawnChanse = .01;
        this.waveTime = 5000;
    }
    create() {
        this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg');

        this.bullets = this.add.group();
        this.enemyBullets = this.add.group();

        this.player = new PlayerPrefab(this.game, 100, 100, null, this.bullets);
        this.add.existing(this.player);

        // this.enemy = new EnemyPrefab(this.game, 0, 0, null, this.enemyBullets);
        // this.add.existing(this.enemy);

        this.enemies = this.add.group();
        for (let i = 0; i < 5; i++) {
            let enemy = new EnemyPrefab(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, null, this.enemyBullets);
            this.enemies.add(enemy);
        }

        this.explosion = this.game.add.emitter(0, 0, 200);
        this.explosion.makeParticles('hexagon');
        this.explosion.setAlpha(1, 0, 2000);
        this.explosion.minParticleScale = .2;
        this.explosion.maxParticleSpeed = new Phaser.Point(300, 100);


        this.waveTimer = this.game.time.create(false);
        this.waveTimer.loop(this.waveTime, this.incrementWave, this);
        this.waveTimer.start();

        this.setupUI();
    }
    update() {
        this.bg.tilePosition.x -= this.spawnChanse * 400;

        if (Math.random() < this.spawnChanse) {
            let enemy = new EnemyPrefab(
                this.game,
                this.game.width + 100,
                Math.random() * this.game.height,
                null,
                this.enemyBullets
            );
            this.enemies.add(enemy);
        }
        this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
    }
    setupUI() {
        this.UILayer = this.add.group();
        this.scoreField = new NumberBoxPrefab(this.game, 'circle', 0);
        this.healthBar = new BarPrefab(this.game, 120, 40, 'health_bar', 'health_holder');
        this.UILayer.add(this.healthBar);
    }
    incrementWave() {
        if (this.spawnChanse < .025)
            this.spawnChanse *= 1.1;
    }
    damageEnemy(enemy, bullet) {
        this.explosion.x = enemy.x;
        this.explosion.y = enemy.y;

        this.explosion.explode(2000, 6);

        this.score += enemy.score;
        this.scoreField.setValue(this.score);

        enemy.kill();
        bullet.kill();
    }
    damagePlayer(player, enemy) {
        this.player.damage(1);
        this.healthBar.setValue(this.player.health / this.player.maxHealth);

        enemy.kill();

        if (this.player.health <= 0) {
            this.game.state.start('end');
        }
    }
};