const { smart } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分割css文件

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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // url: false,
            },
          },
          "postcss-loader",
        ],
        // MiniCssExtractPlugin.loader 替换style-loader 使用link的方式加载到html中
        //style-loader 把css插入到head标签中
        //css-loader 解析@import这种语法的
        //"postcss-loader" 加浏览器前缀
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("production"),
    }),
    new MiniCssExtractPlugin({
      //从html中抽离出css作为一个单独的文件
      filename: "css/main.css",
    }),
  ],
});
