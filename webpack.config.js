const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =(env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            betterRSlider: './src/index.ts',
            index: './scss/index.scss',
            'better-rslider': './scss/better-rslider.scss'
        },
        mode: argv.mode,
        devtool: 'source-map',
        output: {
            library: 'betterRSlider',
            libraryTarget: 'umd',
            libraryExport: 'default',
            filename: isProduction ? '[name].min.js' : '[name].js',
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
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                publicPath: 'dist'
            })
        ],
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devServer: {
            contentBase: path.join(__dirname, '/dist'),
            port: 3000
        }
    }
};