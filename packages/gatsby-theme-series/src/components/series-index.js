import React from 'react'
import {Link} from 'gatsby'
import pluralize from 'pluralize'
import Layout from './layout'

export default ({data}) => {
  const series = data.allSeries.nodes

  return (
    <Layout title="All Post Series">
      {!!series.length && (
        <ul>
          {series.map(s => (
            <li key={s.id}>
              <Link to={s.slug}>{s.name}</Link> (
              {pluralize('post', s.posts.length, true)})
              {s.description && <p>{s.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
