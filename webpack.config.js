const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node modules/'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
              },
            
    ]
    },


      devtool: 'source-map',

    devServer: {
        overlay: true
    },
    
}


