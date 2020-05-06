const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分割css文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:5].js",
    path: path.resolve(__dirname, "../build"),
    // publicPath: "/",
  },
  // 1）。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
  plugins: [
    // new webpack.NamedModulesPlugin(),
    //动态连接库 先打包好react 和react-dom 放在dist目录下，当js文件使用react的时候可以直接引用无需打包 - webpack.react.js
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dist", "manifest.json"),
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new webpack.BannerPlugin("xiaopanpan"), //给打包出的文件前面加备注
    new CleanWebpackPlugin(), //清除上一次打包build内容
    new HtmlWebpackPlugin({
      // 使用html模版插件
      template: "src/index.html",
      filename: "index.html",
      minify: {
        // removeAttributeQuotes: true, //移除双引号生产环境使用
        // collapseWhitespace: true, //叠行生产环境使用
      },
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
  // resolve: {
  //   //解析第三方包commom
  //   modules: [path.resolve("node_modules")],
  //   extensions: [".js", ".css", ".json"], //引入可以省去后缀
  //   mainFields: ["style", "main"],
  //   mainFiles: [],
  //   alias: {
  //     bootstrap: "bootstrap/dist/css/bootstrap.css",
  //   },
  // },

  // 2）。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
  module: {
    //happyPlugin 多线程
    //模块
    noParse: /jquery/, //不需去解析jquery中的依赖关系
    rules: [
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
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import", //用以解析识别import()动态导入语法---并非转换，而是解析识别
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
        // {
        //  loader: 'style-loader',
        //  options:{
        //    insertAt:'top'
        //  }
        // }
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
