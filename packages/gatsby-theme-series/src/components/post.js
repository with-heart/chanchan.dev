import React from 'react'
import {Link} from 'gatsby'
import Layout from './layout'

export default ({data: {seriesPost: post}}) => {
  return (
    <Layout title={post.title}>
      <article>
        <section dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
      <footer>
        This post is part of the{' '}
        <Link to={post.series.slug}>{post.series.name}</Link> series.
      </footer>
    </Layout>
  )
}
