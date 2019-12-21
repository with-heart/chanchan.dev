const {merge} = require('lodash/fp')

const defaultOptions = {
  basePath: '/',
  contentPath: 'content/series',
}

module.exports = merge(defaultOptions)
