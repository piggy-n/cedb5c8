const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const LOCALHOST = 'https://lzz.enbo12119.com';
const LOCALHOST = 'http://192.168.9.148';

module.exports = merge(common, {
    mode: "development",
    entry: {
        app: "./src/demo/index.tsx",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true,
        port: 9000,
        compress: true,
        hot: true,
        proxy: {
            '/prod-api': {
                target: LOCALHOST,
                changeOrigin: true,
            },
            '/proxy': {
                target: LOCALHOST,
                changeOrigin: true,
                pathRewrite: { '^/proxy': '' },
            },
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/demo/index.html",
            inject: "body",
            hash: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
});
