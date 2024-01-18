
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
})


/** @type { import("webpack").Configuration } */
module.exports = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
              },
            },
          },
        },
      ],
    },
    plugins: [htmlPlugin],
    devServer: {
      port: 8001,
    },
  };