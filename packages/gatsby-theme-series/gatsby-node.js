const slugify = require('slugify')
const withDefaults = require('./utils/default-options')

exports.onCreateNode = (
  {node, actions, createNodeId, createContentDigest, getNode, getNodes},
  themeOptions,
) => {
  const {createNode} = actions
  const {contentPath, basePath} = withDefaults(themeOptions)

  // create Series
  if (
    node.internal.type === 'File' &&
    node.sourceInstanceName === contentPath &&
    node.base === 'series.json'
  ) {
    const data = require(node.absolutePath)
    const slug = data.slug || slugify(data.name.toLowerCase())
    const fieldData = {
      ...data,
      slug: `${basePath ? `${basePath.replace(/\//g, '')}/` : ''}${slug}`,
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
  if (
    node.internal.type === `MarkdownRemark` &&
    getNode(node.parent).sourceInstanceName === contentPath
  ) {
    const relativeDirectory = getNode(node.parent).relativeDirectory
    const seriesNode = getNodes().find(node => {
      const parent = getNode(node.parent)
      return (
        node.internal.type === `Series` &&
        parent.sourceInstanceName === 'series' &&
        parent.base === 'series.json' &&
        parent.relativeDirectory === relativeDirectory
      )
    })
    const title = node.frontmatter.title
    const nodeSlug = slugify(title.toLowerCase())
    const slug = seriesNode ? `${seriesNode.slug}/${nodeSlug}` : nodeSlug
    const fieldData = {
      title: title,
      slug,
      excerpt: node.excerpt,
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

const SeriesIndex = require.resolve('./src/templates/series-index.js')
const SeriesTemplate = require.resolve('./src/templates/series.js')

exports.createPages = async ({graphql, actions}, themeOptions) => {
  const {createPage} = actions
  const {basePath} = withDefaults(themeOptions)

  createPage({
    path: basePath,
    component: SeriesIndex,
  })

  const result = await graphql(
    `
      {
        allSeries {
          nodes {
            slug
          }
        }
      }
    `,
  )

  if (result.errors) {
    throw result.errors
  }

  const series = result.data.allSeries.nodes

  series.forEach(s => {
    const slug = s.slug
    createPage({
      path: slug,
      component: SeriesTemplate,
      context: {
        slug,
      },
    })
  })
}

exports.createResolvers = ({createResolvers}) => {
  const resolvers = {
    Series: {
      posts: {
        type: [`SeriesPost`],
        resolve: async (source, args, context, info) => {
          // find series posts sourced from the same directory as the `Series`
          const relativeDirectory = context.nodeModel.getNodeById({
            id: source.parent,
          }).relativeDirectory
          const seriesPosts = context.nodeModel
            .getAllNodes({
              type: `SeriesPost`,
            })
            .filter(node => {
              const parent = context.nodeModel.getNodeById({id: node.parent})
              const file = context.nodeModel.getNodeById({
                id: parent.parent,
                type: `File`,
              })
              return file.relativeDirectory === relativeDirectory
            })
          return seriesPosts
        },
      },
    },
  }
  createResolvers(resolvers)
}
