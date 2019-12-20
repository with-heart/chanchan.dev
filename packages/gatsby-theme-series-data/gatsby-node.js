exports.createSchemaCustomization = ({actions, schema}) => {
  const {createTypes} = actions

  createTypes(`
    interface SeriesPost @nodeInterface {
      id: ID!
      title: String!
      slug: String!
      excerpt: String
      content: String!
    }
  `)

  createTypes(`
    type Series implements Node {
      id: ID!
      name: String!
      slug: String!
      description: String
      posts: [SeriesPost]!
    }
  `)
}
