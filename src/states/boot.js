export default class {
    preload() {
        this.load.image('preloader', '/assets/img/loading_bar.png');
    }
    create() {
        this.game.input.maxPointers = 1;
        this.game.state.start('preload');
    }
};