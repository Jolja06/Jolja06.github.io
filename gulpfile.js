'use strict'

var 
  gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  useref = require('gulp-useref');

  gulp.task('server', function() {
  browserSync.init({
    server: 'app'
  });

  browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});
  
  gulp.task('html', function () {
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'));
  });