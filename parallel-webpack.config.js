const path = require("path");

const PATHS = {
  app: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

module.exports = [
  {
    mode: "production",
    entry: {
      page1: "./src/pages/page1/page1.js",
      page2: "./src/pages/page2/page2.js"
    },
    output: {
      filename: "[name].js",
      path: PATHS.dist
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "./commons/commons",
            chunks: "all",
            minChunks: 2,
            enforce: true
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: PATHS.app,
          use: "babel-loader"
        }
      ]
    }
  }
  //   {
  //     entry: "./pageB.js",
  //     output: {
  //       path: path.resolve(__dirname, "./dist"),
  //       filename: "pageB.bundle.js"
  //     }
  //   }
];
