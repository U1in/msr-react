// //服务端渲染不需要处理静态资源
require("asset-require-hook")({
  extensions: ["svg", "css", "less", "jpg", "png", "gif"],
});
// 处理ReferenceError: regeneratorRuntime is not defined
require('@babel/polyfill');
// 在node中使用import
require('@babel/register')({
  // plugins: ["@babel/plugin-syntax-dynamic-import"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  cache: false,
});

require('./app');