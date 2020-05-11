/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import Image from 'gatsby-image'

import {rhythm} from '../utils/typography'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: {regex: "/profile-pic.jpg/"}) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const {author, social} = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        You're standing in the digital garden of <strong>{author}</strong>, a
        frontend and user experience developer from Cincinnati, Ohio. This is my
        place for growing ideas. Everything within is a living work-in-progress.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow me on Twitter!
        </a>
      </p>
    </div>
  )
}

export default Bio
