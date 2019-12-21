const withDefaults = require('./default-options')

const isSeriesNode = ({node}, themeOptions) => {
  const {contentPath} = withDefaults(themeOptions)

  return (
    node.internal.type === `File` &&
    node.sourceInstanceName === contentPath &&
    node.base === 'series.json'
  )
}

const isSeriesMarkdownRemark = ({node, getNode}, themeOptions) => {
  const {contentPath} = withDefaults(themeOptions)

  return (
    node.internal.type === `MarkdownRemark` &&
    getNode(node.parent).sourceInstanceName === contentPath
  )
}

const resolvePostSeries = (source, context) => {
  const parent = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const relativeDirectory = context.nodeModel.getNodeById({
    id: parent.parent,
  }).relativeDirectory
  const series = context.nodeModel.getAllNodes({type: `Series`}).find(node => {
    const file = context.nodeModel.getNodeById({
      id: node.parent,
      type: `File`,
    })
    return file.relativeDirectory === relativeDirectory
  })
  return series
}

const resolveSeriesPosts = (source, context) => {
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
    .sort(sortItems)
  return seriesPosts
}

const sortNaN = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    if (!isNaN(a)) return -1
    if (!isNaN(b)) return 1
  } else if (a !== b) {
    return a - b
  }
}

const sortItems = (a, b) => {
  const orderA = a.order !== null ? a.order : NaN
  const orderB = b.order !== null ? b.order : NaN
  const sortedOrder = sortNaN(orderA, orderB)
  if (sortedOrder) return sortedOrder

  const dateA = a.date !== null ? new Date(a.date) : new Date(undefined)
  const dateB = b.date !== null ? new Date(b.date) : new Date(undefined)
  const sortedDate = sortNaN(dateA, dateB)
  if (sortedDate) return sortedDate

  return a.title.localeCompare(b.title)
}

module.exports = {
  isSeriesNode,
  isSeriesMarkdownRemark,
  resolvePostSeries,
  resolveSeriesPosts,
  sortItems,
}
