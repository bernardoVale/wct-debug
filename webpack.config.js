const webpack = require("webpack");
const path = require("path");
const extractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const readPkgUp = require("read-pkg-up");

const packageData = readPkgUp.sync({normalize: true});
const PACKAGE_NAME = packageData.pkg.name.split("/");

const PASS_THROUGH_SASS_IMPORTS = ["components/ecom-component-config"];

const BUILD_DIR = path.resolve("dist");
const DEMO_DIR = path.resolve("demo");

module.exports = {
    entry: {
        [PACKAGE_NAME[1]]: path.resolve("src", `${PACKAGE_NAME[1]}`),
        "document-register-element": "document-register-element"
    },
    output: {
        path: BUILD_DIR,
        filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new extractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.join(DEMO_DIR, "index.html"),
            inject: "body",
            excludeChunks: ["document-register-element"],
            cache: false,
            hash: true
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\/(?!(@web-component-utility|@web-component-ecom-product|@web-component-ecom-common)\/).*/,
            loader: "babel-loader",
            query: {
                presets: [
                    ["env", {
                        "targets": {
                            "browsers": ["last 2 versions"]
                        },
                        "debug": true
                    }]
                ],
                plugins: [
                    "transform-class-properties"
                ]
            }
        },
        {
            test: /\.sass$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader", options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader", options: {
                            sourceMap: "inline",
                            plugins: () => [
                                require("autoprefixer")()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            importer: function(url) {
                                if (PASS_THROUGH_SASS_IMPORTS.includes(url)) {
                                    return { contents: "" };
                                } else {
                                    return null;
                                }
                            }
                        }
                    }
                ]
            })
        }]
    },
    resolve: {
        symlinks: false,
        modules: [
            "node_modules",
            path.join(__dirname, "../node_modules")
        ]
    },
    devServer: {
        contentBase: "./demo",
        historyApiFallback: true,
        compress: true,
        inline: true,
        hot: true,
        host: "0.0.0.0",
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: "\u001b[32m"
            }
        }
    }
}
