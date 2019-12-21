const withDefaults = require('series-utils/default-options')

module.exports = themeOptions => {
  const {contentPath} = withDefaults(themeOptions)

  return {
    plugins: [
      `gatsby-theme-series-data`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
          name: contentPath,
        },
      },
    ],
  }
}
