const path = require("path");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

const commonConfig = merge([
  {
    entry: {
      "./page1/page1": "./src/pages/page1/page1.js",
      "./page2/page2": "./src/pages/page2/page2.js"
    },
    output: {
      filename: "[name].js",
      path: PATHS.dist
    }
  },
  parts.loadJavaScript({ include: PATHS.app })
]);

const productionConfig = merge([
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            filename: "./commons/commons[id].js",
            chunks: "all",
            minChunks: 2,
            enforce: true
          }
        }
      }
    }
  },
  parts.minifyJavaScript()
]);

module.exports = merge(commonConfig, productionConfig, { mode: "production" });
