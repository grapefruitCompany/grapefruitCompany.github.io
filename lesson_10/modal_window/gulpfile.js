'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src(['./sass/*.scss', './sass/*.sass'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('watch', function () {
  gulp.watch(['./sass/*.scss', './sass/*.sass'], ['sass']);
});

gulp.task('build', function () {
	gulp.src('./css/*.css')
		.pipe(gulp.dest('poject/css'));
	gulp.src('*.html')
		.pipe(gulp.dest('poject'));
});