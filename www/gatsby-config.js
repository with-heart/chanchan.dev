const title = "Mark's Digital Garden"
const publishDraft = process.env.NODE_ENV === 'development'
const seriesOptions = {
  basePath: `series`,
  contentPath: `content/series`,
  tableOfContents: 'bottom',
  publishDraft,
}

module.exports = {
  siteMetadata: {
    title: title,
    author: `Mark Chandler`,
    description: `A blog about frontend and user experience development.`,
    siteUrl: `https://chanchan.dev/`,
    social: {
      twitter: `grow_love`,
    },
    repository: 'https://github.com/with-heart/chanchan.dev',
  },
  plugins: [
    `gatsby-plugin-inter-font`,
    {
      resolve: `gatsby-theme-series`,
      options: seriesOptions,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-series`,
            options: seriesOptions,
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: `chanchan.dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-draft`,
      options: {
        fieldName: `draft`,
        timezone: `America/New_York`,
        publishDraft,
      },
    },
  ],
}
