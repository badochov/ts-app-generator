const common = require("./webpack.common");
const merge = require("weback-merge");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
});
