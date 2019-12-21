const slugify = require('slugify')
const withDefaults = require('./utils/default-options')
const {
  isSeriesNode,
  isSeriesMarkdownRemark,
  resolveSeriesPosts,
} = require('./utils')

exports.onCreateNode = (context, themeOptions) => {
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
    const slug = seriesNode ? `${seriesNode.slug}/${nodeSlug}` : nodeSlug
    const fieldData = {
      title: title,
      slug,
      order: node.frontmatter.order,
      date: node.frontmatter.date,
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
const Post = require.resolve('./src/templates/post.js')

exports.createPages = async ({graphql, actions}, themeOptions) => {
  const {createPage} = actions
  const {basePath} = withDefaults(themeOptions)

  createPage({
    path: basePath,
    component: SeriesIndex,
  })

  const seriesResult = await graphql(
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

  if (seriesResult.errors) {
    throw seriesResult.errors
  }

  const series = seriesResult.data.allSeries.nodes

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

  const seriesPostResult = await graphql(
    `
      {
        allSeriesPost {
          nodes {
            slug
          }
        }
      }
    `,
  )

  if (seriesPostResult.errors) {
    throw seriesPostResult.errors
  }

  const seriesPosts = seriesPostResult.data.allSeriesPost.nodes

  seriesPosts.forEach(post => {
    const slug = post.slug
    createPage({
      path: slug,
      component: Post,
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
          return resolveSeriesPosts(source, context)
        },
      },
    },
  }
  createResolvers(resolvers)
}
