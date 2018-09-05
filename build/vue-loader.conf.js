var utils = require('./utils')
var config = require('../config')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: process.env.NODE_ENV === 'production'
      ? config.build.productionSourceMap
      : process.env.NODE_ENV === 'testing' ? config.test.productionSourceMap : config.dev.cssSourceMap,
    extract: process.env.NODE_ENV === 'production'||process.env.NODE_ENV === 'testing'
  })
}
