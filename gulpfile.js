var gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    zip = require('gulp-zip'),
    psi = require('psi'),
    pkg = require('./package.json');

var paths = {
  styles: [
    pkg.name + '/assets/css/src/*.css',
    pkg.name + '/assets/css/src/*.scss'
  ],
  scripts: pkg.name + '/assets/js/src/*.js',
  images: pkg.name + '/assets/images/src/*'
};

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat(pkg.name + '.css'))
    .pipe(cssmin({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'));
});
gulp.task('styles-test', ['styles'], function() {
  return gulp.src(pkg.name + '/assets/css/*.css')
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter());
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat(pkg.name + '.js', {newLine: ';'}))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/js'));
});
gulp.task('scripts-test', ['scripts'], function() {
  return gulp.src(pkg.name + '/assets/js/*.js')
    .pipe(jshint('jshintrc.json'))
    .pipe(jshint.reporter());
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest(pkg.name + '/assets/images'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('test', function() {
  gulp.start('styles-test', 'scripts-test');
});

gulp.task('zip', function() {
  return gulp.src('**', { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(zip(pkg.name + '-ghost.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('psi-mobile', function (cb) {
  psi({
    nokey: 'true',
    url: pkg.website,
    locale: 'en_US',
    strategy: 'mobile',
    threshold: 80
  }, cb);
});
gulp.task('psi-desktop', function (cb) {
  psi({
    nokey: 'true',
    url: pkg.website,
    locale: 'en_US',
    threshold: 80
  }, cb);
});
