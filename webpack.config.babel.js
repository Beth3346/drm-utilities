import path from 'path';
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      app: './js/build/app.js'
    },
    output: {
        path: path.join(__dirname, 'js/build'),
        publicPath: '/js/build',
        filename: 'app.min.js'
    },
    plugins: [
        new HTMLWebpackPlugin({title: 'Hot Reload'})
    ],
};