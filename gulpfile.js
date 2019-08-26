const gulp = require("gulp");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const inject = require("gulp-inject");
const es = require("event-stream");
const del = require("del");
const webpack = require("webpack");
const gulpWebpack = require("gulp-webpack");
const webpackConfig = require("./webpack.config");

const paths = {
  root: "./dist",
  templates: {
    pages: "./src/pages/**/*.pug"
    // dest: "./dist"
  },
  styles: {
    pages: "./src/pages/**/*.scss"
    // dest: "./dist"
  },
  scripts: {
    pages: "./src/pages/**/*.js"
    // dest: "./dist"
  }
};
// clean dist
function clean() {
  return del(paths.root);
}
// scss
function styles() {
  return gulp
    .src(paths.styles.pages)
    .pipe(sourcemaps.init())
    .pipe(postcss(require("./postcss.config")))
    .pipe(sourcemaps.write())
    .pipe(
      rename(function(path) {
        path.basename += "-min";
        path.extname = ".css";
      })
    )
    .pipe(gulp.dest(paths.root));
}
// js
function scripts() {
  return gulp
    .src(paths.scripts.pages)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.root));
}
// pug
function templates() {
  let cssFiles = styles();
  let scriptFiles = scripts();

  return gulp
    .src(paths.templates.pages)
    .pipe(inject(es.merge(cssFiles, scriptFiles)))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}
exports.templates = gulp.series(clean, templates);
exports.scripts = gulp.series(clean, scripts);
