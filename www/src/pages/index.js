import React from 'react'
import {Link, graphql} from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {rhythm} from '../utils/typography'

export default ({data, location}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const series = data.allSeries.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Site index" />
      <Bio />

      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid hsla(0,0%,0%,0.07)',
            paddingBottom: '0.25rem',
          }}
        >
          <h2 style={{margin: 0, padding: 0, border: 0}}>Latest Posts</h2>
          <Link to={`/posts`}>all posts</Link>
        </div>
        {posts.map(({node}) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{boxShadow: `none`}} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </section>

      {!!series.length && (
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid hsla(0,0%,0%,0.07)',
              paddingBottom: '0.25rem',
            }}
          >
            <h2 style={{margin: 0, padding: 0, border: 0}}>Latest Series</h2>
            <Link to={`/series`}>all series</Link>
          </div>

          {series.map(node => {
            return (
              <article key={node.id}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{boxShadow: `none`}} to={node.slug}>
                      {node.name}
                    </Link>
                  </h3>
                </header>
                <section>
                  <p dangerouslySetInnerHTML={{__html: node.description}} />
                </section>
              </article>
            )
          })}
        </section>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 5
      filter: {fields: {draft: {eq: false}, collection: {eq: "blog"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    allSeries(limit: 5, filter: {draft: {eq: false}}) {
      nodes {
        id
        name
        description
        slug
        postCount
      }
    }
  }
`
