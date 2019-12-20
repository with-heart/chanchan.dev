import React from 'react'
import Layout from './layout'

export default ({data: {seriesPost: post}}) => {
  return (
    <Layout title={post.title}>
      <article>
        <section dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
    </Layout>
  )
}
