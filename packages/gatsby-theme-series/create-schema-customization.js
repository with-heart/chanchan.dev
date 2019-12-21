const _ = require('lodash')
const {resolvePostSeries} = require('./utils')

const splitProxyString = str =>
  str.split('.').reduceRight((acc, chunk) => {
    return {[chunk]: acc}
  }, true)

module.exports = ({actions}, themeOptions) => {
  const {createFieldExtension, createTypes} = actions

  createFieldExtension({
    name: 'series',
    extend(options, prevFieldConfig) {
      return {
        resolve(source, args, context, info) {
          return resolvePostSeries(source, context)
        },
      }
    },
  })

  createFieldExtension({
    name: 'proxyResolve',
    args: {
      from: {type: 'String!'},
    },
    extend: (options, previousFieldConfig) => {
      return {
        resolve: async (source, args, context, info) => {
          await context.nodeModel.prepareNodes(
            info.parentType, // BlogPostMdxDev
            splitProxyString(options.from), // querying for resolvable field
            splitProxyString(options.from), // resolve this field
            [info.parentType.name], // The types to use are these
          )

          const newSource = await context.nodeModel.runQuery({
            type: info.parentType,
            query: {filter: {id: {eq: source.id}}},
            firstOnly: true,
          })

          return _.get(newSource.__gatsby_resolved, options.from)
        },
      }
    },
  })

  createTypes(`
    type SeriesPostMarkdownRemark implements Node & SeriesPost
      @childOf(types: ["MarkdownRemark"]) {
        title: String!
        slug: String!
        content: String! @proxyResolve(from: "parent.html")
        series: Series! @series
      }
  `)
}
