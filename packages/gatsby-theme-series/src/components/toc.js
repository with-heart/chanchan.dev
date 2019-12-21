import React from 'react'
import {Link} from 'gatsby'

export default ({currentPost, series}) => {
  return (
    <>
      <p>
        This post is part of the <Link to={series.slug}>{series.name}</Link>{' '}
        series.
      </p>

      <ol>
        {series.posts.map(post => {
          return (
            <li key={post.id}>
              {post.id === currentPost.id ? (
                post.title
              ) : (
                <Link to={post.slug}>{post.title}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </>
  )
}
