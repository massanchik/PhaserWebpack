var path = require('path');
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    watch: true,
    devtool: 'source-map',
    context: __dirname,

    entry: [
        './src/app.js'
    ],

    output: {
        path: path.resolve('./js'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',
        publicPath: './js/'
    },

    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        },
        extensions: ['.js']
    },

    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
            {test: /pixi\.js/, use: ['expose-loader?PIXI']},
            {test: /phaser-split\.js$/, use: ['expose-loader?Phaser']},
            {test: /p2\.js/, use: ['expose-loader?p2']}
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2015', 'babel-preset-stage-1'].map(require.resolve)
                },
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
};
