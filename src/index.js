//26) 懒加载
let buttom = document.createElement("button");
buttom.innerHTML = "xiaopan";
buttom.addEventListener("click", function () {
  //es6 草案中的写法jsonp实现动态加载文件 需配合 @babel/plugin-syntax-dynamic-import 使用
  import("./a").then((res) => {
    console.log("res", res);
  });
});
document.body.appendChild(buttom);

//24）
// import hanshu from "./a";
// console.log(hanshu.sum(1, 2));

// import React from "react";
// import { render } from "react-dom";
// render(<h1>jsx</h1>, window.root);

// import moment from "moment";
// import "moment/locale/zh-cn";
// moment.locale("zh-cn");
// let data = moment().toNow();
// console.log("data", data);

// console.log("DEV", DEV);

// let xxr = new XMLHttpRequest();
// xxr.open("get", "/api/user", true);
// xxr.onload = function () {
//   console.log("xxr", xxr.response);
// };
// xxr.send();

// class getsccs {
//   constructor() {
//     console.log("出错了ddxxxx");
//   }
// }
// let aa = new getsccs();

// webpack 中引入图片的三种方式
// 1、js创建图片
// import img from "../assets/ddone.jpeg";
// let image = new Image();
// image.src = img;
// image.style.width = "200px";
// document.body.appendChild(image);
//在css中使用背景图引入可以直接被打包
//使用img标签引入图片

// import $ from "expose-loader?$!jquery";  //第一种
// import $ from "jquery"; //在webpack中配置好expose-loader也可以拿到window.$
// console.log("$", window.$);
//。。。。。使用注入的方式
// new webpack.ProvidePlugin({
//   $: "jquery", //注入每个组件中
// }),
// console.log("$", $);

//。。。。。cdn引入
// import $ from "jquery"; //配置externals不会从package.json中安装依赖
// console.log("$", window.$);

require("./index.css");
// require("@babel/polyfill"); //补丁转es7语法
// @lccc
// class AA {
//   a = 1;
// }
// let a = new AA();
// function lccc(target) {
//   console.log("23", target);
// }
// "bb".includes("b");
