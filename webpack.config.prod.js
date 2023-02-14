const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: "production",
    devtool: "",
    entry: {
        index: "./src/index",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist"),
        libraryTarget: "commonjs2",
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css",
        }),
    ],
    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react",
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom",
        },
    },
});
