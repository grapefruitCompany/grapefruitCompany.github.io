'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var plumber = require("gulp-plumber");

//npm install  gulp-sass --save-dev
gulp.task('sass', function () {
  return gulp
    .src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    // .pipe(rename("styles.css"))
    .pipe(autoprefixer({
      browsers: ['> 0.5%', ' last 2 versions', 'Firefox ESR', 'not dead'],
      cascade: false
      }))
    .pipe(gulp.dest('src/css/')); 
});


//npm install --save-dev gulp-watch
gulp.task('watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
});

//npm install browser-sync gulp --save-dev
gulp.task('browser-sync', function() {
  browserSync.init({
    server: { baseDir: "src" }
    });
});


gulp.task('build', function () {
  gulp.src('src/css/*.css')
    .pipe(gulp.dest('build/css'));
  gulp.src('src/img/*.*')
    .pipe(gulp.dest('build/img'));
  gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('w', ['watch', 'browser-sync']);