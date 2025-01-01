const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        port: 3000,
        static: path.join(__dirname, "dist"),
        open: true
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    mode: "development",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    entry: ".src/index.tsx"
}