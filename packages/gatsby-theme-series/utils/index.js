const withDefaults = require('./default-options')

exports.isSeriesNode = ({node}, themeOptions) => {
  const {contentPath} = withDefaults(themeOptions)

  return (
    node.internal.type === `File` &&
    node.sourceInstanceName === contentPath &&
    node.base === 'series.json'
  )
}

exports.isSeriesMarkdownRemark = ({node, getNode}, themeOptions) => {
  const {contentPath} = withDefaults(themeOptions)

  return (
    node.internal.type === `MarkdownRemark` &&
    getNode(node.parent).sourceInstanceName === contentPath
  )
}

exports.resolveSeriesPosts = (source, context) => {
  const relativeDirectory = context.nodeModel.getNodeById({
    id: source.parent,
  }).relativeDirectory
  const seriesPosts = context.nodeModel
    .getAllNodes({
      type: `SeriesPost`,
    })
    .filter(node => {
      const parent = context.nodeModel.getNodeById({id: node.parent})
      const file = context.nodeModel.getNodeById({
        id: parent.parent,
        type: `File`,
      })
      return file.relativeDirectory === relativeDirectory
    })
  return seriesPosts
}
