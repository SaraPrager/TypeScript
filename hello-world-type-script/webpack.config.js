const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    devServer: {
        port: 3000,
        open: true,
        publicPath: '/dist/'
    }
}