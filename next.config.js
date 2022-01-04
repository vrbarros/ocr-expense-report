const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const pluginAntdLess = withAntdLess({
  lessVarsFilePath: './src/styles/variables.less',
});

module.exports = withPlugins([[pluginAntdLess]], {});
