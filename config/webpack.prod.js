const { smart } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
module.exports = smart(base, {
  mode: "production",
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(), // 压缩css文件
      new UglifyJSPlugin({
        //使用了OptimizeCSSAssetsPlugin之后原本production环境可以自动压缩js的功能就失效，需要使用UglifyJSPlugin插件压缩js
        cache: true,
        parallel: true, //并发打包
        sourceMap: true, //SourceMaps 将错误信息的位置映射到模块
      }),
    ],
    splitChunks: {
      //分割代码块，多页面使用,抽离公共模块
      cacheGroups: {
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          minSize: 0, //超过一个字节就抽离
          minChunks: 2, //使用2次以上就抽离
        },
        vendor: {
          priority: 1, //权重比common高，先抽离
          test: /node_modules/,
          chunks: "initial",
          minSize: 0, //超过一个字节就抽离
          minChunks: 2, //使用2次以上就抽离
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("production"),
    }),
  ],
});
