import gulp from 'gulp';
import fs from 'fs';
import browserify from 'browserify';
import {
  create as createBrowserSync,
} from 'browser-sync';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';

const browserSync = createBrowserSync();

const paths = {
  scripts: {
    main: 'src/main.js',
    src: 'src/*.js',
    dist: 'public/js',
  },
};

export function bundle() {
  return browserify(paths.scripts.main)
    .transform('babelify', {
      presets: ['@babel/preset-env'],
      sourceMaps: true,
    })
    .bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(rename('bundle.min.js'))
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dist));
}

export function serve() {
  browserSync.init({
    base: './public',
  });

  gulp.watch(paths.scripts.src, bundle);
  gulp.watch(paths.scripts.dist).on('change', browserSync.reload);
}

export default gulp.series(bundle, serve);
