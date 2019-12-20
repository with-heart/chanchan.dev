import React from 'react'
import {Link} from 'gatsby'
import Layout from './layout'

export default ({data}) => {
  const series = data.series

  return (
    <Layout title={series.name}>
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
    </Layout>
  )
}
