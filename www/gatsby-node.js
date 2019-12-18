const _ = require('lodash')
const path = require(`path`)
const {createFilePath} = require(`gatsby-source-filesystem`)
const slugify = require('slugify')

const splitProxyString = str =>
  str.split('.').reduceRight((acc, chunk) => {
    return {[chunk]: acc}
  }, true)

exports.createSchemaCustomization = ({actions, schema}) => {
  const {createTypes, createFieldExtension} = actions

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
        id: ID!
        title: String!
        slug: String!
        excerpt: String
        content: String! @proxyResolve(from: "parent.html")
      }
  `)
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {fields: {draft: {eq: false}}}
          sort: {fields: [frontmatter___date], order: DESC}
          limit: 1000
        ) {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === 0 ? null : posts[index - 1].node
    const next = index === posts.length - 1 ? null : posts[index + 1].node
    const relativePath = getContentFilename(post.node.fileAbsolutePath)

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        relativePath,
      },
    })
  })
}

const CONTENT_REGEX = /\/www\/content\/.*/
const getContentFilename = filename => {
  if (!filename) return
  const match = filename.match(CONTENT_REGEX)
  return match ? match[0] : null
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const {createNodeField, createNode} = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (
    node.internal.type === `MarkdownRemark` &&
    getNode(node.parent).sourceInstanceName === 'series'
  ) {
    const title = node.frontmatter.title
    const fieldData = {
      title: title,
      slug: slugify(title.toLowerCase()),
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
