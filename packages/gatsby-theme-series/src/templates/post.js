import React from 'react'
import Layout from '../components/layout'
import Post from '../components/post'

export default ({data: {post}, location}) => {
  return (
    <Layout location={location}>
      <Post {...post} />
    </Layout>
  )
}
