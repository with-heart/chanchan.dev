const fs = require('fs')
const path = require('path')

exports.onPreBootstrap = () => {
  const sourceDir = path.join(path.dirname(require.resolve('.')), './inter')
  const files = fs.readdirSync(sourceDir)
  files.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, file),
      path.join(process.cwd(), 'public', file),
    )
  })
}
