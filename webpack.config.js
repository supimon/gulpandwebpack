const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = {
  entry: {
    comp1_page: "./src/pages/comp1_page/comp1_page.js",
    comp2_page: "./src/pages/comp2_page/comp2_page.js"
  },
  output: {
    filename: "[name].min.js"
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
};

module.exports = config;
