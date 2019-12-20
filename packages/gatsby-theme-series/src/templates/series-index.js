import {graphql} from 'gatsby'
import SeriesIndex from '../components/series-index'

export default SeriesIndex

export const query = graphql`
  {
    allSeries {
      nodes {
        id
        name
        slug
        posts {
          slug
        }
      }
    }
  }
`
