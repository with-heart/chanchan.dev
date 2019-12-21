const withDefaults = require('./utils/default-options')

module.exports = (
  {actions: {createNode}, createContentDigest},
  themeOptions,
) => {
  const seriesConfig = withDefaults(themeOptions)

  createNode({
    ...seriesConfig,
    id: `gatsby-theme-series-config`,
    parent: null,
    children: [],
    internal: {
      type: `SeriesConfig`,
      contentDigest: createContentDigest(JSON.stringify(seriesConfig)),
      content: JSON.stringify(seriesConfig),
      description: `Series Config`,
    },
  })
}
