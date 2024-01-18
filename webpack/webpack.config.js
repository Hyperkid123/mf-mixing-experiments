const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

const MFPlugin = new ModuleFederationPlugin({
  name: 'WebpackApp',
  filename: 'webpack-entry.js',
  library: {
    type: 'global',
    name: 'WebpackApp',
  },
  exposes: {
    './WebpackCounter': './src/exposedModules/counter.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
});

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
  plugins: [htmlPlugin, MFPlugin],
  devServer: {
    port: 8001,
  },
};
