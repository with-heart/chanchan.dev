import React from 'react'
import {Link} from 'gatsby'
import pluralize from 'pluralize'

export default ({data}) => {
  const series = data.allSeries.nodes

  return (
    <div>
      <h1>All Post Series</h1>

      {!!series.length && (
        <ul>
          {series.map(s => (
            <li key={s.id}>
              <Link to={s.slug}>{s.name}</Link> (
              {pluralize('post', s.posts.length, true)})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
