const _ = require('lodash/fp')
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
    createPage({
      path: slug,
      component: SeriesTemplate,
      context: {
        slug,
      },
    })

    s.posts.forEach(post => {
      const slug = post.slug
      createPage({
        path: slug,
        component: Post,
        context: {
          slug,
        },
      })
    })
  })
}
