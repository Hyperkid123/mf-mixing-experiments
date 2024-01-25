const rspack = require('@rspack/core');

const HTMLPlugin = new rspack.HtmlRspackPlugin({
  template: './index.html',
});

const MFPlugin = new rspack.container.ModuleFederationPlugin({
  name: 'RspackApp',
  filename: 'rspack-entry.js',
  library: {
    type: 'global',
    name: 'RspackApp',
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
  exposes: {
    './RspackCounter': './src/exposedModules/counter.js',
  },
});

/** @type { import("rspack").Configuration } */
module.exports = {
  mode: 'development',
  entry: {
    main: {
      import: ['./src/index.js'],
    },
  },
  output: {
    // remote public must be either auto or the full path with origin
    publicPath: 'auto',
  },
  devServer: {
    client: {
      overlay: false,
    },
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
  plugins: [HTMLPlugin, MFPlugin],
  builtins: {
    progress: {},
    react: {
      development: true,
      refresh: true,
    },
  },
};
