var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('../build'))
});

gulp.task('css', function() {
  return gulp.src('css/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('../build/css'))
});

gulp.task('images', function() {
  return gulp.src('media/images/*.{png,gif,jpg}')
    .pipe(gulp.dest('../build/media/images'))
});

gulp.task('audio', function() {
  return gulp.src('media/audio/*.mp3')
    .pipe(gulp.dest('../build/media/audio'))
});

gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(gulp.dest('../build/js'))
});

gulp.task('vendors', function() {
  return gulp.src('vendors/**/*.js')
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../build/js'))
});

gulp.task('default', ['html', 'css', 'images', 'audio', 'js', 'vendors']);
