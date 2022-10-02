const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
  },
  externalsPresets: { node: true },
};
