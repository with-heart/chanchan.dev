const {merge} = require('lodash/fp')

const defaultOptions = {
  basePath: '/',
  contentPath: 'content/series',
  tableOfContents: false,
  publishDraft: false,
}

module.exports = merge(defaultOptions)
