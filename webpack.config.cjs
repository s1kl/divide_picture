const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
      index: path.join(__dirname, 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          // test: /\.(png|jpe?g|webp|tiff?)/i,
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false }
            }
          ]
        },
      ],
    },
    devServer: {
      static: "dist",
      open: true
    }
};