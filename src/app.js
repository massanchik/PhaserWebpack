import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Boot from './states/boot';
import Preload from './states/preload';
import Game from './states/game';
import Start from './states/start';
import End from './states/end';


let game = new Phaser.Game(1024, 768, Phaser.Auto, 'game');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);
game.state.add('start', Start);
game.state.add('end', End);
game.state.start('boot');