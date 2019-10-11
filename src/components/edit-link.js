import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import './edit-link.css'

export default ({path}) => {
  const {
    site: {
      siteMetadata: {repository},
    },
  } = useStaticQuery(
    graphql`
      query REPOSITORY_QUERY {
        site {
          siteMetadata {
            repository
          }
        }
      }
    `,
  )

  const href = `${repository}/blob/master${path}`

  return repository && path ? (
    <a class="edit-link" href={href}>
      Edit this page on Github
    </a>
  ) : null
}
