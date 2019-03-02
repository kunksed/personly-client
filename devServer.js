/* eslint-disable */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
const path = require('path');
const env = require('node-env-file');

env(path.join(__dirname, '.env'));

const serverUrl = process.env.BASE_URL || 'http://localhost:19';
const PORT = process.env.PORT || 5000;
const IP = serverUrl.match(/\w+/g)[1];

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: path.join(__dirname, 'app/build'),
}).listen(PORT, IP, function (err, result) {
  if (err) { return console.log(""); }
  console.log(`Listening at http://${IP}:${PORT}`);
});
