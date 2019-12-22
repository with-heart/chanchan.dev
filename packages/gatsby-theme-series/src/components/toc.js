import React from 'react'
import {Link} from 'gatsby'
import PostList from './post-list'

export default ({currentPost, series}) => {
  return (
    <>
      <p>
        This post is part of the <Link to={series.slug}>{series.name}</Link>{' '}
        series.
      </p>

      <PostList currentPost={currentPost} posts={series.posts} />
    </>
  )
}
