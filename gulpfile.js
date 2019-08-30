const gulp = require("gulp");
const pug = require("gulp-pug");
const inject = require("gulp-inject");
const del = require("del");
const webpack = require("webpack");
const gulpWebpack = require("gulp-webpack");
const { prodWebpack, devWebpack } = require("./webpack.config");

const paths = {
  root: "./dist",
  templates: {
    pages: "./src/pages/**/*.pug"
  },
  assets: {
    pages: ["./src/pages/**/*.js", "./src/pages/**/*.scss"]
  }
};

// clean dist
function clean() {
  return del(paths.root);
}

function buildDevAssets() {
  return gulp
    .src(paths.assets.pages)
    .pipe(gulpWebpack(devWebpack, webpack))
    .pipe(gulp.dest(paths.root));
}

function buildProdAssets() {
  return gulp
    .src(paths.assets.pages)
    .pipe(gulpWebpack(prodWebpack, webpack))
    .pipe(gulp.dest(paths.root));
}

exports.buildDevAssets = gulp.series(clean, buildDevAssets);
exports.buildProdAssets = gulp.series(clean, buildProdAssets);
