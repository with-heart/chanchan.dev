import React from 'react'
import PostList from './post-list'

export default ({name, description, posts}) => {
  return (
    <article>
      <h2>{name}</h2>
      {description && <p>{description}</p>}
      <PostList posts={posts} />
    </article>
  )
}
