'use strict';
import gulp from 'gulp';
import fs from "fs";
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import path from "path";
import es from "event-stream";
import runSequence from 'run-sequence';
const $ = gulpLoadPlugins();
const clientDistFolder = 'dist/public';
const serverDistFolder = 'dist/server';
let NODE_ENV = "development";

let NODE_PATH = path.join(__dirname, 'node_modules');

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('scss', [], () => {
  return gulp.src(['client/asset/scss/*.scss', '!client/asset/scss/**/*.scss'])
    .pipe($.changed('.tmp/', {
      extension: '.css'
    }))
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/static/'))
    .pipe($.livereload());

})
gulp.task('jade',[],()=>{
  return gulp.src(['client/**/*.jade','!client/includes/**/*.jade'])
    .pipe($.changed('.tmp/', {
      extension: '.html'
    }))
    .pipe($.jade({
      client: false
    }))
    .pipe(gulp.dest('.tmp/'))
    .pipe($.livereload());
})

gulp.task('serve', ['scss'], () => {
  $.livereload.listen({
    port: 33333
  })
  gulp.watch(['client/asset/scss/*.scss'], ['scss'])

})
gulp.task('default', ['clean'], () => {

  gulp.start('serve');
});
