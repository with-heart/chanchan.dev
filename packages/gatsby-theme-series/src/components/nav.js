import React from 'react'
import {Link} from 'gatsby'

export default ({post, series, previous, next}) => {
  return (
    <>
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
    </>
  )
}
