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
let NODE_ENV ="development";

let NODE_PATH = path.join(__dirname, 'node_modules');

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], () => {

  gulp.start('serve');
});
