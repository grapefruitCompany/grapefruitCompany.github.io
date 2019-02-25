const path = require('path'); 

module.exports = {
  mode: 'production', 
  entry: './src/index.js', 
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    ]
  },
  output: { 
    filename: 'main.js', 
    path: path.resolve(__dirname, 'build') 
    }
  };