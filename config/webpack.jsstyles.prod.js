const path = require("path");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");
const SassLintPlugin = require("sass-lint-webpack");

const PATHS = {
  app: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

const commonConfig = merge([
  {
    entry: {
      "./page1/page1": "./src/pages/page1/page1scss.js",
      "./page2/page2": "./src/pages/page2/page2scss.js",
      "./page3/page3": "./src/pages/page3/page3less.js"
    },
    output: {
      path: PATHS.dist
    }
  },
  {
    plugins: [new SassLintPlugin()]
  }
]);

const productionConfig = merge([
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            chunks: "all",
            minChunks: 3, // this should be equal to the total pages
            enforce: true
          }
        }
      }
    }
  },
  parts.extractCSS({
    useScss: ["css-loader", parts.autoprefix(), "sass-loader"],
    useLess: ["css-loader", parts.autoprefix(), "less-loader"]
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
