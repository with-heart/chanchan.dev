const visit = require('unist-util-visit')
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
  const {tableOfContents} = withDefaults(pluginOptions)

  if (tableOfContents && isSeriesMarkdownRemark(context, pluginOptions)) {
    const seriesPostContext = getMarkdownRemarkSeriesContext(
      context,
      pluginOptions,
    )

    const toc = createTOC(seriesPostContext)

    switch (tableOfContents) {
      case 'top':
        markdownAST.children.unshift(toc)
        break
      case 'bottom':
        markdownAST.children.push(toc)
        break
      case 'both':
        markdownAST.children.unshift(toc)
        markdownAST.children.push(toc)
        break
      default:
        replacePlaceholders(markdownAST, tableOfContents, toc)
    }
  }

  return markdownAST
}

const replacePlaceholders = (markdownAST, placeholder, replacement) => {
  visit(markdownAST, 'html', node => {
    if (node.value.toLowerCase() === `<!-- ${placeholder} -->`) {
      node.value = replacement.value
    }
  })
}
