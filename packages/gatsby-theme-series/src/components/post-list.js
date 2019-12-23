import React from 'react'
import {Link} from 'gatsby'

export default ({currentPost = {}, posts}) => {
  return (
    <ol>
      {posts.map(post => {
        console.log('draft', post.draft)
        return (
          <li key={post.id}>
            {post.id === currentPost.id || post.draft ? (
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
