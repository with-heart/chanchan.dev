import {graphql} from 'gatsby'
import SeriesIndex from '../templates/series-index'

export default SeriesIndex

export const query = graphql`
  {
    series: allSeries {
      nodes {
        id
        name
        slug
        description
        posts {
          slug
        }
      }
    }
  }
`
