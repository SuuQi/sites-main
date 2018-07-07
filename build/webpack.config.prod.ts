const path = require('path');
const webpackConfig = require('./webpack.config.base.ts');

webpackConfig.output.path = path.join(__dirname, '../dist/client');
webpackConfig.mode = 'production';

module.exports = webpackConfig;
