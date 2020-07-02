// 处理ReferenceError: regeneratorRuntime is not defined
require('@babel/polyfill');
// 在node中使用import
require('@babel/register')({
  plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: ["@babel/preset-env"],
  ignore: ['node_modules'],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  cache: false,
});

require('./app');