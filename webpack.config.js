const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = {

  entry: {
    'wiktionary-definition-parser': path.join(PATHS.src, 'wiktionary-definition-parser.ts'),
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /(\.ts)/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
