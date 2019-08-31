const path = require("path");
const merge = require("webpack-merge");
const parts = require("./config/webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist")
};

const commonConfig = merge([parts.loadJavaScript({ include: PATHS.app })]);

const productionConfig = merge([]);

const developmentConfig = merge([]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
