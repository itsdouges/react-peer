const path = require('path');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, '../test'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
};
