var gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-sass-lint');
    autoprefixer = require('gulp-autoprefixer'),
    combine = require('gulp-combine-mq'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-uglify'),
    svgmin = require('gulp-svgmin'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    zip = require('gulp-zip'),
    psi = require('psi'),
    pkg = require('./package.json');

var styles = [
  pkg.name + '/assets/css/source/vendor/*.css',
  pkg.name + '/assets/css/source/*.scss'
],
scripts = [
  pkg.name + '/assets/js/source/vendor/*.js',
  pkg.name + '/assets/js/source/*.js',
],
svgs = pkg.name + '/assets/images/source/*.svg',
images = [
  pkg.name + '/assets/images/source/*',
  '!' + svgs
];

gulp.task('styles', function() {
  return gulp.src(styles)
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat(pkg.name + '.css'))
    .pipe(combine())
    .pipe(cssmin({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'));
});
gulp.task('styles-test', ['styles'], function() {
  return gulp.src(pkg.name + '/assets/css/*.css')
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter());
});
gulp.task('styles-test-sass', function() {
  return gulp.src(pkg.name + '/assets/css/source/*.scss')
    .pipe(sasslint())
    .pipe(sasslint.format());
});

gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(concat(pkg.name + '.js', {newLine: ';'}))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/js'));
});
gulp.task('scripts-test', function() {
  return gulp.src(pkg.name + '/assets/js/source/*.js')
    .pipe(jshint('jshintrc.json'))
    .pipe(jshint.reporter());
});

gulp.task('images', function() {
  gulp.src(images)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(pkg.name + '/assets/images'));
  gulp.src(svgs)
    .pipe(svgmin({
      plugins: [{
        cleanupIDs: false
      }, {
        mergePaths: false
      }]
    }))
    .pipe(gulp.dest(pkg.name + '/assets/images'));
});

gulp.task('watch', function() {
  gulp.watch(styles, ['styles']);
  gulp.watch(scripts, ['scripts']);
  gulp.watch(images, ['images']);
});

gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('test', function() {
  gulp.start('styles-test', 'scripts-test');
});

gulp.task('zip', function() {
  return gulp.src(['**', '!**/source/**'], { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(zip(pkg.name + '-ghost.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('psi-mobile', function (cb) {
  psi({
    nokey: 'true',
    url: pkg.website,
    locale: 'en_US',
    strategy: 'mobile',
    threshold: 85
  }, cb);
});
gulp.task('psi-desktop', function (cb) {
  psi({
    nokey: 'true',
    url: pkg.website,
    locale: 'en_US',
    threshold: 90
  }, cb);
});
