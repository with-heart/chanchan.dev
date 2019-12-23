const _ = require('lodash')

const splitProxyString = str =>
  str.split('.').reduceRight((acc, chunk) => {
    return {[chunk]: acc}
  }, true)

module.exports = ({actions}, themeOptions) => {
  const {createFieldExtension, createTypes} = actions

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

  const typeDefs = `
    type SeriesPostMarkdownRemark implements Node & SeriesPost
      @childOf(types: ["MarkdownRemark"]) {
        title: String!
        slug: String!
        content: String! @proxyResolve(from: "parent.html")
        excerpt: String @proxyResolve(from: "parent.excerpt")
        series: Series! @link
      }

    enum NavType {
      nav
      toc
    }

    type SeriesConfig implements Node {
      basePath: String!
      contentPath: String!
      navType: NavType
    }
  `

  createTypes(typeDefs)
}
