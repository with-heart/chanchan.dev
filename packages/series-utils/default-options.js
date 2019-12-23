const {merge} = require('lodash/fp')

const defaultOptions = {
  basePath: '/',
  contentPath: 'content/series',
  showTableOfContents: false,
}

module.exports = merge(defaultOptions)
