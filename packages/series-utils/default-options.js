const {merge} = require('lodash/fp')

const defaultOptions = {
  basePath: '/',
  contentPath: 'content/series',
  showTableOfContents: false,
  publishDraft: false,
}

module.exports = merge(defaultOptions)
