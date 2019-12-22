import React from 'react'
import Layout from '../components/layout'
import SeriesIndex from '../components/series-index'

export default ({
  data: {
    series: {nodes: series},
  },
  location,
}) => {
  return (
    <Layout location={location}>
      <SeriesIndex series={series} />
    </Layout>
  )
}
