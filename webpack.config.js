var path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: "/dist/",
        compress: true,
        port: 4200,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
    ]
};