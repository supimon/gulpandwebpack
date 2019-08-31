const gulp = require("gulp");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const webpackProdScriptsConfig = require("./gulpwebpack.scripts.config.prod");
const webpackProdStylesConfig = require("./gulpwebpack.styles.config.prod");
const del = require("del");
// paths
const paths = {
  root: "./dist",
  templates: {
    pages: "./src/pages/**/*.pug"
  },
  styles: {
    files: "./src/pages/**/*.scss"
  },
  scripts: {
    files: "./src/pages/**/*.js"
  }
};
// clean dist
function clean() {
  return del(paths.root);
}
// env = production
function buildScripts() {
  return gulp
    .src(paths.scripts.files)
    .pipe(gulpWebpack(webpackProdScriptsConfig, webpack))
    .pipe(gulp.dest(paths.root));
}
function buildStyles() {
  return gulp
    .src(paths.styles.files)
    .pipe(gulpWebpack(webpackProdStylesConfig, webpack))
    .pipe(gulp.dest(paths.root));
}
exports.build = gulp.series(clean, gulp.parallel(buildScripts, buildStyles));
