import {graphql} from 'gatsby'
import Post from '../components/post'

export default Post

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
