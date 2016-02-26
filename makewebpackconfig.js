var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = function (options) {
    var entry, jsLoaders, plugins, cssLoaders, devtool;

    // If production is true
    if (options.prod) {
        // Entry
        entry = [
            path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
        ];
        cssLoaders = ['file-loader?name=[path][name].[ext]'];
        // Plugins
        plugins = [// Plugins for Webpack
            new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
                compress: {
                    warnings: false // ...but do not show warnings in the console (there is a lot of them)
                }
            }),
            new HtmlWebpackPlugin({
                template: 'index.html', // Move the index.html file...
                minify: { // Minifying it while it is parsed using the following, self–explanatory options
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                }
            }),
            new AppCachePlugin({
                exclude: ['.htaccess']
            })
        ];

        // If app is in development
    } else {
        devtool = 'cheap-eval-source-map';
        // Entry
        entry = [
            "webpack-dev-server/client?http://localhost:3000", // Needed for hot reloading
            "webpack/hot/only-dev-server", // See above
            path.resolve(__dirname, 'js/app.js') // Start with js/app.js...
        ];
        // Only plugin is the hot module replacement plugin
        plugins = [
            new webpack.HotModuleReplacementPlugin(), // Make hot loading work
            new AppCachePlugin(),
            new ExtractTextPlugin('app.css', {
                allChunks: true
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ]
    }

    return {
        devtool: devtool,
        entry: entry,
        output: { // Compile into js/build.js
            path: path.resolve(__dirname, 'build'),
            filename: "js/bundle.js"
        },
        module: {
            loaders: [{
                test: /\.js$/, // Transform all .js files required somewhere within an entry point...
                loader: 'babel', // ...with the specified loaders...
                exclude: path.join(__dirname, '/node_modules/') // ...except for the node_modules folder.
            }, {
                test: /\.css$/,
                loaders: ['style', 'css']
            }, {
                test: /\.(scss|sass)$/,
                loaders: ['style', 'css', 'sass']
            }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            }, {
                test: /\.woff$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
            }, {
                test: /\.woff2$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
            }, {
                test: /\.(eot|ttf|svg|gif|png)$/,
                loader: "file-loader"
            },
                {
                    test: /\.jpe?g$|\.gif$|\.png$/i,
                    loader: "url-loader?limit=10000"
                }
            ]
        },
        plugins: plugins,
        target: "web", // Make web variables accessible to webpack, e.g. window
        stats: false, // Don't show stats in the console
        progress: true
    }
}
