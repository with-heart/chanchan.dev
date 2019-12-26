import React from 'react'
import Layout from '../components/layout'
import Post from '../components/post'

export default ({data: {post}, location, pageContext}) => {
  return (
    <Layout location={location} {...pageContext}>
      <Post {...post} />
    </Layout>
  )
}
