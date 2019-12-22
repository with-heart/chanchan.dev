import React from 'react'
import Layout from '../components/layout'
import Post from '../components/post'
import Nav from '../components/nav'
import TableOfContents from '../components/toc'

export default ({
  data: {
    post,
    config: {navType},
  },
  pageContext: {previous, next},
  location,
}) => {
  return (
    <Layout location={location}>
      <Post {...post} />
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
