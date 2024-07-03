const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server.js', // Điểm vào của ứng dụng back-end
  target: 'node', // Đặt mục tiêu là môi trường Node.js
  externals: [nodeExternals()], // Loại trừ các module trong node_modules khỏi bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map' // Tạo source map để debug dễ dàng hơn
};
