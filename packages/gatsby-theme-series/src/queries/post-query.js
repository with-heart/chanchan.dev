import {graphql} from 'gatsby'
import PostTemplate from '../templates/post'

export default PostTemplate

export const query = graphql`
  query SeriesPostBySlug($slug: String!) {
    config: seriesConfig {
      navType
    }
    post: seriesPost(slug: {eq: $slug}) {
      id
      title
      slug
      content
      series {
        name
        slug
        posts {
          id
          title
          slug
        }
      }
    }
  }
`
