const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

const MFPlugin = new ModuleFederationPlugin({
  name: 'CollectionWebpack',
  filename: 'collection-webpack-entry.js',
  library: {
    type: 'global',
    name: 'CollectionWebpack',
  },
  exposes: {
    './Input': './src/webpack-remote.js',
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
    '@mui/material/Button': {
      requiredVersion: '>=5.0.0',
      version: '5.15.6',
    },
    '@mui/material/TextField': {
      requiredVersion: '>=5.0.0',
      version: '5.15.6',
    },
    '@mui/material/Typography': {
      requiredVersion: '>=5.0.0',
      version: '5.15.6',
    },
    '@mui/material/Divider': {
      requiredVersion: '>=5.0.0',
      version: '5.15.6',
    },
    '@emotion/react': {
      requiredVersion: '>=11.0.0',
    },
    '@emotion/styled': {
      requiredVersion: '>=11.0.0',
    },
  },
});

/** @type { import("webpack").Configuration } */
module.exports = {
  // no need for entry point
  entry: path.resolve(__dirname, './src/webpack-remote.js'),
  output: {
    path: path.resolve(__dirname, './dist/webpack'),
  },
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
  plugins: [MFPlugin],
};
