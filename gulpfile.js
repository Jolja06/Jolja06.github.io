'use strict'

var 
  gulp = require('gulp'),
  browserSync = require('browser-sync').create();

  gulp.task('server', function() {
  browserSync.init({
    server: 'app'
  });

  browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});