const withDefaults = require('./utils/default-options')

const SeriesIndex = require.resolve('./src/templates/series-index.js')
const SeriesTemplate = require.resolve('./src/templates/series.js')
const Post = require.resolve('./src/templates/post.js')

module.exports = async ({graphql, actions}, themeOptions) => {
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
            posts {
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

  series.forEach(s => {
    const slug = s.slug
    const posts = s.posts
    createPage({
      path: slug,
      component: SeriesTemplate,
      context: {
        slug,
      },
    })

    posts.forEach((post, index) => {
      const next = index === posts.length - 1 ? null : posts[index + 1]
      const previous = index === 0 ? null : posts[index - 1]
      createPage({
        path: post.slug,
        component: Post,
        context: {
          ...post,
          previous,
          next,
        },
      })
    })
  })
}
