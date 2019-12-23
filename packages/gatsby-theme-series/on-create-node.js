const slugify = require('slugify')
const withDefaults = require('series-utils/default-options')
const {isSeriesNode, isSeriesMarkdownRemark} = require('series-utils')

module.exports = (context, themeOptions) => {
  const {
    node,
    actions,
    createNodeId,
    createContentDigest,
    getNode,
    getNodes,
  } = context
  const {createNode} = actions
  const {contentPath, basePath} = withDefaults(themeOptions)

  // create Series
  if (isSeriesNode(context, themeOptions)) {
    const data = require(node.absolutePath)
    const slug = data.slug || slugify(data.name.toLowerCase())
    const fieldData = {
      ...data,
      slug: `/${basePath ? `${basePath.replace(/\//g, '')}/` : ''}${slug}`,
    }

    createNode({
      id: createNodeId(`${node.id} >>> Series`),
      ...fieldData,
      parent: node.id,
      children: [],
      internal: {
        type: `Series`,
        contentDigest: createContentDigest(JSON.stringify(fieldData)),
        content: JSON.stringify(fieldData),
        description: `Series: "represents a series of posts"`,
      },
    })
  }

  // create SeriesPostMarkdownRemark
  if (isSeriesMarkdownRemark(context, themeOptions)) {
    const relativeDirectory = getNode(node.parent).relativeDirectory
    const seriesNode = getNodes().find(node => {
      const parent = getNode(node.parent)
      return (
        node.internal.type === `Series` &&
        parent.sourceInstanceName === contentPath &&
        parent.base === 'series.json' &&
        parent.relativeDirectory === relativeDirectory
      )
    })
    const title = node.frontmatter.title
    const nodeSlug = slugify(title.toLowerCase())
    const slug = seriesNode ? `${seriesNode.slug}/${nodeSlug}` : `/${nodeSlug}`
    const fieldData = {
      title: title,
      slug,
      order: node.frontmatter.order,
      date: node.frontmatter.date,
      excerpt: node.excerpt,
      series: seriesNode.id,
    }

    createNode({
      id: createNodeId(`${node.id} >>> SeriesPostMarkdownRemark`),
      ...fieldData,
      parent: node.id,
      children: [],
      internal: {
        type: `SeriesPostMarkdownRemark`,
        contentDigest: createContentDigest(JSON.stringify(fieldData)),
        content: JSON.stringify(fieldData),
        description: `SeriesPostMarkdownRemark: "represents a post in a series"`,
      },
    })
  }
}
