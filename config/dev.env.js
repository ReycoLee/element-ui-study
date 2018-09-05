var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //USERCENTER_API_PATH: '"http://10.182.82.31/v1/usercenter"',
  USERCENTER_API_PATH: '"http://127.0.0.1"',
  SAIBONG_API_PATH: '"http://10.182.82.31/v1/saibong"'
})
