import React from 'react'
import Layout from '../components/layout'
import Series from '../components/series'

export default ({data: {series}, location}) => {
  return (
    <Layout location={location}>
      <Series {...series} />
    </Layout>
  )
}
