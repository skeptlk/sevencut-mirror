
const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@models': path.resolve(__dirname, 'src/models'),
    '@styles': path.resolve(__dirname, 'src/styles')
  })
);
