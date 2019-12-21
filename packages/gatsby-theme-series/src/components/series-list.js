import React from 'react'
import {Link} from 'gatsby'

export default ({currentPost = {}, series}) => {
  return (
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
  )
}
