const common = require("./webpack.common");
const merge = require("weback-merge");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
});
