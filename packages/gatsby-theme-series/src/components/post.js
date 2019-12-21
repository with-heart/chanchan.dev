import React from 'react'
import Layout from './layout'
import Nav from './nav'
import TableOfContents from './toc'

export default ({
  data: {
    post,
    config: {navType},
  },
  pageContext: {previous, next},
}) => {
  return (
    <Layout title={post.title}>
      <article>
        <section dangerouslySetInnerHTML={{__html: post.content}} />
      </article>
      {!!navType && (
        <footer>
          {navType === 'nav' && (
            <Nav
              post={post}
              series={post.series}
              previous={previous}
              next={next}
            />
          )}
          {navType === 'toc' && (
            <TableOfContents currentPost={post} series={post.series} />
          )}
        </footer>
      )}
    </Layout>
  )
}
