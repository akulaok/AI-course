import { src, dest, watch, series, parallel } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import pug from "gulp-pug";
import del from "del";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import browserSyncModule from "browser-sync";

const sass = gulpSass(dartSass);
const browserSync = browserSyncModule.create();

const paths = {
  pug: { src: "src/pages/**/*.pug", dest: "dist/" },
  styles: { src: "src/styles/**/*.scss", dest: "dist/css" },
  scripts: { src: "src/scripts/**/*.js", dest: "dist/js" },
  images: { src: "src/images/**/*", dest: "dist/images" },
  fonts: { src: "src/fonts/**/*", dest: "dist/fonts" },
};

export function cleanDist() {
  return del(["dist"]);
}

export function html() {
  return src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

export function styles() {
  return src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 1 }))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

export function scripts() {
  return src(paths.scripts.src)
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

export function images() {
  return src(paths.images.src).pipe(dest(paths.images.dest));
}

export function fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

export function serve() {
  browserSync.init({
    server: { baseDir: "dist" },
    notify: false,
    online: true,
  });

  watch(paths.pug.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.fonts.src, fonts);
}

export const build = series(
  cleanDist,
  parallel(html, styles, scripts, images, fonts)
);

export default series(build, serve);
