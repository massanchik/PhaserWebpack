import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Boot from './states/boot';
import Preload from './states/preload';
import Game from './states/game';


let game = new Phaser.Game(800, 600, Phaser.Auto, 'game');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);
game.state.start('boot');