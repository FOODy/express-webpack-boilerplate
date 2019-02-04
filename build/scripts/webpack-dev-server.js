const express = require('express');
const proxy = require('http-proxy-middleware');
const webpack = require('webpack');
const webpackConfig = Object.assign(
  {},
  require('../config/webpack.browser.js')(null, {
    mode: 'development',
  }),
);

const port = parseInt(process.env.APP_PORT || 0, 10) || 8080;
const host = process.env.APP_HOST || 'localhost';

const compiler = webpack(webpackConfig);
const app = express();

//
// Expose webpack
//
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

//
// Setup proxy to http server
//
app.use('*', proxy({
  target: 'http://' + host + ':' + port,
  changeOrigin: true,
}));

//
// Start webpack dev server
//
app.listen(
  port + 1,
  () => {
    console.log('*******************************************************');
    console.log('Webpack Dev Server started!');
    console.log('Listening: http://' + host + ':' + (port + 1));
    console.log('*******************************************************');
  },
);