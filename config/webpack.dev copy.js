const { smart } = require("webpack-merge");
const base = require("./webpack.base");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分割css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 500, //防抖
  //   poll: 1000, //每秒问我1000次
  //   ignored: /node_modules/,
  // },
  // resolve: {
  //   //解析第三方包commom
  //   // modules: [path.resolve("node_modules")],
  //   // extensions: [".js", ".css", ".json"], //引入可以省去后缀
  //   // mainFields: ["style", "main"],
  //   // mainFiles:[]
  //   // alias: {
  //   //   bootstrap: "bootstrap/dist/css/bootstrap.css",
  //   // },
  // },
  devServer: {
    //3)
    //2) 模拟数据
    // before(app) {
    //   app.get("/api/user", (req, res) => {
    //     res.json({ name: "xiaopan" });
    //   });
    // },
    //1)
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:4000",
    //     pathRewirte: { "/api": "" },
    //   },
    // },
  },
  output: {
    filename: "bundle.[hash:5].js",
    path: path.resolve(__dirname, "../build"),
    // publicPath: "./",
  },
  //eval-source-map 不会产生单独的文件可以定位错误的行和列
  //source-map 会产生行和列单独的文件
  //cheap-module-source-map 不会产生列但是是一个单独的映射文件
  //cheap-module-eval-source-map 不会产生列也不会产生一个单独的映射文件
  devtool: "source-map",
  optimization: {
    //优化项 开发环境就算没有注释也不会执行
    minimizer: [
      new OptimizeCSSAssetsPlugin(), // 压缩css文件
      new UglifyJSPlugin({
        //使用了OptimizeCSSAssetsPlugin之后原本production环境可以自动压缩js的功能就失效，需要使用UglifyJSPlugin插件压缩js
        cache: true,
        parallel: true, //并发打包
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEV: JSON.stringify("dev"),
    }),
    new CleanWebpackPlugin(), //清除上一次打包build内容
    new webpack.BannerPlugin("xiaopanpan"), //给打包出的文件前面加备注
    new HtmlWebpackPlugin({
      // 使用html模版插件
      template: "src/index.html",
      filename: "index.html",
      // minify: {
      //   removeAttributeQuotes: true, //移除双引号生产环境使用
      //   collapseWhitespace: true, //叠行生产环境使用
      // },
      Hash: true,
      // chunks: [], //当多页面的时候可以在数组内加要引入的js
    }),
    new MiniCssExtractPlugin({
      //从html中抽离出css作为一个单独的文件
      filename: "css/main.css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery", //注入每个组件中
    }),
  ],
  // externals: {
  //   //cdn 引入的时候 组件也import jquery 打开
  //   jquery: "$",
  // },
  module: {
    //模块
    noParse: /jquery/,
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: ["eslint-loader"],
      //     options: {
      //       enforce: "pre", //previous post
      //     },
      //   },
      // },
      // {
      //   test: require.resolve("jquery"),
      //   use: "expose-loader?$",
      // },
      {
        //解析html例如img标签引入的图片
        test: /\.html$/,
        use: "html-withimg-loader",
      },
      {
        test: /\.(png|jif|jpg|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            outputPath: "img/",
            publicPath: "./img",
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", //babel-loader转化下载器，@babel/core核心模块点用transform函数进行转化，@babel/preset-env将es5转化为es6
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              // "@babel/plugin-syntax-dynamic-import",
              ["@babel/plugin-proposal-decorators", { legacy: true }], //属性修饰器 legacy：true 宽松模式
              ["@babel/plugin-proposal-class-properties", { loose: true }], //创建class类的插件
              "@babel/plugin-transform-runtime", //转换高级的例如promise、generator函数，必须结合@babel/runtime 使用
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
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
};
