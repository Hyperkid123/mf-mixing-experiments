const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container } = require('webpack');

const MFPlugin = new container.ModuleFederationPlugin({
  name: 'WebpackNativeApp',
  filename: 'webpack-native-entry.js',
  library: {
    type: 'global',
    name: 'WebpackNativeApp',
  },
  exposes: {
    './WebpackNativeCounter': './src/exposedModules/counter.js',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '>=17.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '>=17.0.0',
    },
  },
});

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
});

/** @type { import("webpack").Configuration } */
module.exports = {
  devtool: false,
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
  plugins: [htmlPlugin, MFPlugin],
  devServer: {
    port: 8002,
  },
};
