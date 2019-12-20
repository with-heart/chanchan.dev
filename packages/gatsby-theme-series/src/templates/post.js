import {graphql} from 'gatsby'
import Post from '../components/post'

export default Post

export const query = graphql`
  query SeriesPostBySlug($slug: String!) {
    seriesPost(slug: {eq: $slug}) {
      id
      title
      slug
      content
    }
  }
`
