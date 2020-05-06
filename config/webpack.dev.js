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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            // options: {
            //   insertAt: "top",
            // },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            // options: {
            //   insertAt: "top",
            // },
          },
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(), //打印更新的模块路径
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new webpack.DefinePlugin({
      DEV: JSON.stringify("dev"),
    }),
  ],
});
