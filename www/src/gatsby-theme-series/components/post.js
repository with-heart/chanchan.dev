import React from 'react'
import Bio from '../../components/bio'
import SEO from '../../components/seo'
import EditLink from '../../components/edit-link'
import {rhythm, scale} from '../../utils/typography'

export default ({title, description, date, content, excerpt}) => {
  return (
    <>
      <SEO title={title} description={excerpt} />

      <article>
        <header>
          <h1 style={{marginTop: rhythm(1), marginBottom: 0}}>{title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1),
            }}
          >
            {date}
          </p>
        </header>

        <section dangerouslySetInnerHTML={{__html: content}} />

        <hr style={{marginBottom: rhythm(1)}} />

        <footer>
          <Bio />
        </footer>
      </article>
    </>
  )
}
