const withDefaults = require('series-utils/default-options')
const {
  isSeriesMarkdownRemark,
  getMarkdownRemarkSeriesContext,
} = require('series-utils')
const toc = require('./toc')

function createTOC(context) {
  return {
    type: 'html',
    value: toc(context),
  }
}

module.exports = (context, pluginOptions) => {
  const {markdownAST} = context
  const {showTableOfContents} = withDefaults(pluginOptions)

  if (!showTableOfContents) return markdownAST

  if (isSeriesMarkdownRemark(context, pluginOptions)) {
    const seriesPostContext = getMarkdownRemarkSeriesContext(
      context,
      pluginOptions,
    )

    const toc = createTOC(seriesPostContext)

    markdownAST.children.push(toc)
    return markdownAST
  }

  return markdownAST
}
