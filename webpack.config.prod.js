import webpack from 'webpack';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const GLOBALS = {
    'process.evn.NODE_EVN': JSON.stringify('production')
}

export default {
    devtool: 'source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new BundleAnalyzerPlugin(), // phân tích file bundle
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|zh-tw)$/)
    ],
    optimization: {
        minimize: true,
        // splitChunks: {
        //     // include all types of chunks
        //     chunks: 'all'
        // }
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'font'
                        }
                    }
                ],
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/
            },
            {
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img'
                        }
                    }
                ],
                test: /\.(png|jpg|gif)$/
            }
        ]
    },
};
