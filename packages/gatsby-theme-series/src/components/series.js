import React from 'react'
import {Link} from 'gatsby'

export default ({data}) => {
  const series = data.series

  return (
    <div>
      <h1>{series.name}</h1>

      {series.description && <p>{series.description}</p>}

      {!!series.posts.length && (
        <ul>
          {series.posts.map(post => {
            return (
              <li key={post.id}>
                <Link to={post.slug}>{post.title}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
