const rspack = require('@rspack/core');

const MFPlugin = new rspack.container.ModuleFederationPlugin({
  name: 'CollectionRspackApp',
  filename: 'collection-rspack-entry.js',
  library: {
    type: 'global',
    name: 'CollectionRspackApp',
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
  exposes: {
    './Input': './src/rspack-remote.js',
  },
});

/** @type { import("rspack").Configuration } */
module.exports = {
  mode: 'development',
  entry: {},
  output: {
    // remote public must be either auto or the full path with origin
    publicPath: 'auto',
    path: __dirname + '/dist/rspack',
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
          },
        },
      },
    ],
    parser: {
      asset: {
        dataUrlCondition: {
          maxSize: 1,
        },
      },
    },
  },
  plugins: [MFPlugin],
  builtins: {
    progress: {},
    react: {
      development: true,
      refresh: true,
    },
  },
};
