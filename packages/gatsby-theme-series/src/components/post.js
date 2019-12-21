import React from 'react'
import Layout from './layout'
import Nav from './nav'

export default ({data: {post}, pageContext: {previous, next}}) => {
  return (
    <Layout title={post.title}>
      <article>
        <section dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
      <footer>
        <Nav post={post} series={post.series} previous={previous} next={next} />
      </footer>
    </Layout>
  )
}
