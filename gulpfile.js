const gulp = require("gulp");
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const es = require("event-stream");
const webpackProdScriptsConfig = require("./config/webpack.scripts.prod");
const webpackProdStylesConfig = require("./config/webpack.jsstyles.prod");
const del = require("del");
const pug = require("gulp-pug");
const inject = require("gulp-inject");
const { watch } = require("gulp");
const browserSync = require("browser-sync").create();
const buffer = require("vinyl-buffer");
const imagemin = require("gulp-imagemin");
const spritesmith = require("gulp.spritesmith");
const merge = require("merge-stream");
// paths
const paths = {
  root: "./dist",
  rootjs: "./dist/*.js",
  templates: {
    allFiles: "./src/**/*.pug",
    pages: "./src/pages/**/*.pug"
  },
  styles: {
    allFiles: "./src/**/*.scss",
    files: "./src/pages/**/*.scss",
    page1: "./dist/page1/*.css",
    page2: "./dist/page2/*.css",
    commons: "./dist/commons/*.css"
  },
  scripts: {
    allFiles: "./src/**/*.js",
    files: "./src/pages/**/*.js",
    page1: "./dist/page1/*.js",
    page2: "./dist/page2/*.js",
    commons: "./dist/commons/*.js"
  },
  images: {
    pngFiles: "./src/assets/icons/*.png",
    retinaPng: "./src/assets/icons/*@2x.png",
    spritePath: "./src/assets/sprites/",
    compPngFiles: "./src/components/assets/icons/*.png",
    compRetinaPng: "./src/components/assets/icons/*@2x.png",
    compSpritePath: "./src/components/assets/sprites/"
  }
};
// clean dist
function clean() {
  return del(paths.root);
}
// clean project sprites
function cleanProjectSprite() {
  return del(paths.images.spritePath);
}
// clean component sprites
function cleanCompSprite() {
  return del(paths.images.compSpritePath);
}
// clean unwanted JS from root
function cleanJS() {
  return del(paths.rootjs);
}
cleanCompSprite;

// watch files
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    startPath: "/dist/page1/page1.html"
  });
  watch(
    [paths.styles.allFiles, paths.scripts.allFiles, paths.templates.allFiles],
    gulp.series(
      clean,
      gulp.parallel(buildScripts, buildStyles),
      buildPages,
      cleanJS
    )
  );
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
    .pipe(gulp.dest(paths.root))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}
// project sprite
function projectSprite() {
  return genSprite(
    paths.images.pngFiles,
    paths.images.retinaPng,
    paths.images.spritePath,
    ""
  );
}
// component sprite
function compSprite() {
  return genSprite(
    paths.images.compPngFiles,
    paths.images.compRetinaPng,
    paths.images.compSpritePath,
    "comp"
  );
}

function genSprite(pngFiles, retinaFiles, spritePath, prefix) {
  const spriteData = gulp.src(pngFiles).pipe(
    spritesmith({
      retinaSrcFilter: [retinaFiles],
      imgName: prefix + "sprite.png",
      cssName: prefix + "sprite.scss",
      retinaImgName: prefix + "sprite@2x.png"
    })
  );
  const imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(spritePath));

  // Pipe CSS stream onto disk
  const cssStream = spriteData.css.pipe(gulp.dest(spritePath));
  return merge(imgStream, cssStream);
}
// generate component sprites
exports.buildCompSprite = gulp.series(cleanCompSprite, compSprite);
// generate project sprites
exports.buildProjectSprite = gulp.series(cleanProjectSprite, projectSprite);
// build distribution files
exports.fullbuild = gulp.series(
  clean,
  gulp.parallel(buildScripts, buildStyles),
  buildPages,
  cleanJS,
  watchFiles
);
