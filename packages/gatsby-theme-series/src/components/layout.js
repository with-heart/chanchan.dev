import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'

export default ({children}) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '640px',
      }}
    >
      <header>
        <h3>
          <Link
            to={`/`}
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
          >
            {data.site.siteMetadata.title}
          </Link>
        </h3>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}
