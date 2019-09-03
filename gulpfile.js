const gulp = require("gulp");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const es = require("event-stream");
const webpackProdScriptsConfig = require("./gulpwebpack.scripts.config.prod");
const webpackProdStylesConfig = require("./gulpwebpack.jsstyles.config.prod");
const del = require("del");
const pug = require("gulp-pug");
const inject = require("gulp-inject");
// paths
const paths = {
  root: "./dist",
  templates: {
    pages: "./src/pages/**/*.pug"
  },
  styles: {
    files: "./src/pages/**/*.scss",
    page1: "./dist/page1/*.css",
    page2: "./dist/page2/*.css",
    commons: "./dist/commons/*.css"
  },
  scripts: {
    files: "./src/pages/**/*.js",
    page1: "./dist/page1/*.js",
    page2: "./dist/page2/*.js",
    commons: "./dist/commons/*.js"
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
// pug
function buildPages() {
  return gulp
    .src(paths.templates.pages)
    .pipe(
      inject(
        es.merge(gulp.src(paths.styles.page1), gulp.src(paths.scripts.page1)),
        { name: "page1" }
      )
    )
    .pipe(
      inject(
        es.merge(gulp.src(paths.styles.page2), gulp.src(paths.scripts.page2)),
        { name: "page2" }
      )
    )
    .pipe(
      inject(
        es.merge(
          gulp.src(paths.styles.commons),
          gulp.src(paths.scripts.commons)
        ),
        { name: "commons" }
      )
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}
exports.build = gulp.series(clean, gulp.parallel(buildScripts, buildStyles));
exports.fullbuild = gulp.series(
  clean,
  gulp.parallel(buildScripts, buildStyles),
  buildPages
);
