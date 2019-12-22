import React from 'react'
import {Link} from 'gatsby'
import pluralize from 'pluralize'

export default ({series}) => {
  return (
    <article>
      <h1>All Series</h1>
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
    </article>
  )
}
