/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 23:37:24
 * @LastEditTime: 2019-09-23 23:19:20
 */
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const router = express.Router();
const complier = webpack(webpackConfig);

const hostName = '0.0.0.0';
const port = process.env.PORT || 3000;


app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(complier));

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/simple/get', function(req, res) {
  res.json({
    msg: 'Hello Simple.'
  })
})

router.get('/base/get', function(req, res) {
  res.json(req.body);
})

router.post('/base/post', function(req, res) {
  console.log('/base/post', req.body);
  
  res.json(req.body);
})

router.post('/base/buffer', function(req, res) {
  let msg = [];

  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  });

  req.on('end', () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  })
});

app.use(router);


module.exports = app.listen(port, hostName, () => {
  console.log(`Server listening on: http://${hostName}:${port}`, 'Ctrl + C to stop.');
});