import React from 'react'
import {Link} from 'gatsby'
import Layout from './layout'

export default ({data: {post}, pageContext: {previous, next}}) => {
  return (
    <Layout title={post.title}>
      <article>
        <section dangerouslySetInnerHTML={{__html: post.content}} />
      </article>

      <footer>
        This post is part of the{' '}
        <Link to={post.series.slug}>{post.series.name}</Link> series.
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </footer>
    </Layout>
  )
}
