const path = require('path');

module.exports =(env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: ['webpack/hot/dev-server', './src/index.ts'],
        mode: argv.mode,
        devtool: 'source-map',
        output: {
            library: 'betterRSlider',
            libraryTarget: 'umd',
            libraryExport: 'default',
            filename: isProduction ? 'betterRSlider.min.js' : 'betterRSlider.js',
            path: path.resolve(__dirname, 'dist')
        },
        externals: {
            jquery: 'jQuery',
            $: 'jQuery'
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader'
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            publicPath: '/dist/',
            compress: true,
            hot: true,
            port: 3000
        }
    }
};