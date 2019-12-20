const slugify = require('slugify')
const withDefaults = require('./utils/default-options')

exports.onCreateNode = (
  {node, actions, createNodeId, createContentDigest},
  themeOptions,
) => {
  const {createNode} = actions
  const {contentPath, basePath} = withDefaults(themeOptions)

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
