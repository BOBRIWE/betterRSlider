const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports =(env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: ['webpack/hot/dev-server', './src/index.ts', './scss/index.scss'],
        mode: argv.mode,
        devtool: 'source-map',
        output: {
            library: 'betterRSlider',
            libraryTarget: 'umd',
            libraryExport: 'default',
            filename: isProduction ? 'betterRSlider.min.js' : 'betterRSlider.js',
            path: path.resolve(__dirname, '/dist')
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
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
                publicPath: 'dist'
            }),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devServer: {
            contentBase: path.join(__dirname, '/tests'),
            publicPath: '/dist',
            hot: true,
            port: 3000
        }
    }
};