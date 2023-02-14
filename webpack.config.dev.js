const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        port: 8080,
        compress: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // 启用 css modules, css模块化, 所有类名都默认为当前组件, 或者使用 :global 声明全局样式, 参考 AntDesignPro 的样式引用
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]', // 指定样式名
                                exportGlobals: true, // 注意 :global 声明全局样式需要该属性
                            },
                        }
                    },
                    "sass-loader",
                ],
            },
        ],
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
