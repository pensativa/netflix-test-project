const postcssPresetEnv = require('postcss-preset-env');
const bemLinter = require('postcss-bem-linter');

module.exports = {
  plugins: [postcssPresetEnv(), bemLinter({
    preset: 'bem',
    componentName: '/^[A-Z]+$/',
    componentSelectors: '^\\.{componentName}(?:-[a-z]+)?$'
  })],
};
