import React from 'react'
import Layout from './layout'
import SeriesList from './series-list'

export default ({data}) => {
  const series = data.series

  return (
    <Layout title={series.name}>
      {series.description && <p>{series.description}</p>}

      <SeriesList series={series} />
    </Layout>
  )
}
