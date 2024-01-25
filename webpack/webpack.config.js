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
    react: {
      singleton: true,
      requiredVersion: '>=17.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '>=17.0.0',
    },
    'shared-package': {
      singleton: true,
      requiredVersion: '>=1.0.0',
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
    port: 8001,
    client: {
      overlay: {
        warnings: false,
      },
    },
  },
};
