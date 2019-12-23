const {resolveSeriesPosts} = require('series-utils')

module.exports = ({createResolvers}) => {
  const resolvers = {
    Series: {
      posts: {
        type: [`SeriesPost`],
        resolve: async (source, args, context, info) => {
          return resolveSeriesPosts(source, context)
        },
      },
      postCount: {
        type: `Int`,
        resolve: async (source, args, context, info) => {
          const posts = resolveSeriesPosts(source, context)
          return posts.length
        },
      },
    },
  }
  createResolvers(resolvers)
}
