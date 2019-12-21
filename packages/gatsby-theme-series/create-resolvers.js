const {resolveSeriesPosts} = require('./utils')

module.exports = ({createResolvers}) => {
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