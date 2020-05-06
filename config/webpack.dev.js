const { smart } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
module.exports = smart(base, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(), //打印跟新的模块路径
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new webpack.DefinePlugin({
      DEV: JSON.stringify("dev"),
    }),
  ],
});
