import {graphql} from 'gatsby'
import Series from '../templates/series'

export default Series

export const query = graphql`
  query SeriesBySlug($slug: String!) {
    series(slug: {eq: $slug}) {
      name
      slug
      description
      posts {
        id
        title
        slug
        draft
      }
    }
  }
`
