/* eslint-disable */
const path = require('path')

module.exports = {
	title: 'Vue',
  renderRootJsx: path.join(__dirname, 'styleguide.root.js'),
  assetsDir: path.join(__dirname, 'public'),
  require: [path.join(__dirname, 'src/styles/main.scss'), path.join(__dirname, 'src/utils/icons.js')],
  locallyRegisterComponents: true,
	exampleMode: 'expand',
  theme: {
    fontFamily: {
      base: '"Roboto", sans-serif'
    }
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: require.resolve('svg-sprite-loader'),
          include: [path.resolve(__dirname, 'src/icons')],
          options: {
            symbolId: 'icon-[name]'
          }
        }
      ]
    }
  }
}
