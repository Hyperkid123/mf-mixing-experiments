const rspack = require('@rspack/core');

const HTMLPlugin = new rspack.HtmlRspackPlugin({
  template: './index.html',
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
    publicPath: '/',
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
  plugins: [HTMLPlugin],
  builtins: {
    progress: {},
    react: {
      development: true,
      refresh: true,
    },
  },
};
