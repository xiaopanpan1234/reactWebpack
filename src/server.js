let expr = require("express");
let app = new expr();
let webpack = require("webpack");
// 中间件
let middle = require("webpack-dev-middleware");
let config = require("../config/webpack.dev");
let compiler = webpack(config);
app.use(middle(compiler));
app.get("/api/user", (req, res) => {
  res.json({ name: "xiaopan" });
});
app.listen(4000);
