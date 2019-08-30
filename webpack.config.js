const merge = require("webpack-merge");
const path = require("path");
const parts = require("./config/webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

const commonJSConfig = merge([
  {
    entry: {
      "./assets/js/vendor": "./src/pages/vendor/project_vendor.js",
      "./page1/js/page1": "./src/pages/page1/page1.js",
      "./page2/js/page2": "./src/pages/page2/page2.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
    }
  },
  parts.loadJavaScript()
]);

const commonCSSConfig = merge([
  {
    entry: {
      "./assets/css/vendor": "./src/pages/vendor/project_vendor.scss",
      "./page1/css/page1": "./src/pages/page1/page1.scss",
      "./page2/css/page2": "./src/pages/page2/page2.scss"
    }
  }
]);
const prod = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix(), "sass-loader"]
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  })
]);
const dev = merge([parts.loadCSS()]);

module.exports = {
  prodWebpack: merge(commonJSConfig, commonCSSConfig, prod),
  devWebpack: merge(commonJSConfig, commonCSSConfig, dev)
};
