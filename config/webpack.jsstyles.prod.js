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
      "./page1/page1": "./src/pages/page1/page1scss.js",
      "./page2/page2": "./src/pages/page2/page2scss.js"
    },
    output: {
      path: PATHS.dist
    }
  }
]);

const productionConfig = merge([
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            chunks: "all",
            minChunks: 2,
            enforce: true
          }
        }
      }
    }
  },
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix(), "sass-loader"]
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  })
]);

module.exports = merge(commonConfig, productionConfig, { mode: "production" });
