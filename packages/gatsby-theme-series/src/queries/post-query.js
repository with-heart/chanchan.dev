import {graphql} from 'gatsby'
import PostTemplate from '../templates/post'

export default PostTemplate

export const query = graphql`
  query SeriesPostBySlug($slug: String!) {
    post: seriesPost(slug: {eq: $slug}) {
      id
      date(formatString: "MMMM DD, YYYY")
      title
      slug
      excerpt
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
