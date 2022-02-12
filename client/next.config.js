/** @type {import('next').NextConfig} */
const path = require('path')
const withSass = require('@zeit/next-sass');
// const webpack = require('webpack')

// module.exports = {
//   webpack(config) {
//     config.devtool = 'eval-source-map';
//     return config
//   }
// }

module.exports = {
  reactStrictMode: false,
  distDir: 'build',
}

module.exports = withSass({
  cssModules: true
})

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}