import 'pixi'
import 'p2'
import Phaser from 'phaser'
import StateMain from './state_main';


let game = new Phaser.Game(800, 600, Phaser.Auto);

game.state.add('stateMain', StateMain);
game.state.start('stateMain');