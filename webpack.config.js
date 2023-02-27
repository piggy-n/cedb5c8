const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    devtool: "cheap-module-eval-source-map",
    resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
        extensions: [".tsx", ".ts", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: ["babel-loader", "eslint-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: require.resolve("svg-sprite-loader"),
                include: path.resolve(__dirname, "./src/assets/icons"),
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images/",
                        limit: 8192,
                    },
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "iconfont/",
                    },
                },
            },
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
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag", // singletonStyleTag: 将所有的 style 标签合并成一个
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 启用 css modules, css模块化, 所有类名都默认为当前组件, 或者使用 :global 声明全局样式, 参考 AntDesignPro 的样式引用
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]', // 指定样式名
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
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, "./tsconfig.json"),
            },
        }),
    ],
};
