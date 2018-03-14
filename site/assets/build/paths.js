const path = require('path')

const projectRoot = path.resolve(__dirname, '..', '..')
const moduleRoot = path.resolve(
  projectRoot,
  'modules',
  'alexmarchant',
)

module.exports = {
  projectRoot,
  moduleRoot,
  site: {
    assetsSrc: path.resolve(projectRoot, 'assets'),
    web: path.resolve(projectRoot, 'web'),
    assetsDist: path.resolve(projectRoot, 'web', 'assets'),
  },
  module: {
    assetsSrc: path.resolve(moduleRoot, 'assets', 'src'),
    assetsDist: path.resolve(moduleRoot, 'assets', 'dist'),
  },
}

