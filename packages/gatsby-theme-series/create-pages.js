const withDefaults = require('series-utils/default-options')

const SeriesIndexQuery = require.resolve('./src/queries/series-index-query.js')
const SeriesQuery = require.resolve('./src/queries/series-query.js')
const PostQuery = require.resolve('./src/queries/post-query.js')

module.exports = async ({graphql, actions, getNode}, themeOptions) => {
  const {createPage} = actions
  const {basePath} = withDefaults(themeOptions)

  const seriesResult = await graphql(
    `
      {
        allSeries {
          nodes {
            slug
            posts {
              id
              title
              slug
            }
          }
        }
      }
    `,
  )

  if (seriesResult.errors) {
    throw seriesResult.errors
  }

  const series = seriesResult.data.allSeries.nodes

  if (series.length) {
    createPage({
      path: basePath,
      component: SeriesIndexQuery,
    })
  }

  series.forEach(s => {
    const slug = s.slug
    const posts = s.posts
    createPage({
      path: slug,
      component: SeriesQuery,
      context: {
        slug,
      },
    })

    posts.forEach((post, index) => {
      const node = getNode(post.id)
      const markdownRemark = getNode(node.parent)
      const relativePath = getContentFilename(markdownRemark.fileAbsolutePath)
      const next = index === posts.length - 1 ? null : posts[index + 1]
      const previous = index === 0 ? null : posts[index - 1]
      createPage({
        path: post.slug,
        component: PostQuery,
        context: {
          ...post,
          previous,
          next,
          relativePath,
        },
      })
    })
  })
}

const CONTENT_REGEX = /\/www\/content\/.*/
const getContentFilename = filename => {
  if (!filename) return
  const match = filename.match(CONTENT_REGEX)
  return match ? match[0] : null
}
