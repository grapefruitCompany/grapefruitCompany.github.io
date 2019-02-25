'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
  
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
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('build/css'));
	gulp.src('*.html')
		.pipe(gulp.dest('build'));
});
