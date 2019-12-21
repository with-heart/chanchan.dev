const {merge} = require('lodash/fp')

const defaultOptions = {
  basePath: '/',
  contentPath: 'content/series',
  navType: undefined,
}

module.exports = merge(defaultOptions)
