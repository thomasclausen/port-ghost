var gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-minify-css'),
    uncss = require('gulp-uncss'),
    jshint = require('gulp-jshint'),
    jsmin = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    zip = require('gulp-zip'),
    ftp = require('gulp-ftp'),
    psi = require('psi'),
    pkg = require('./package.json'),
    ftplogin = require('./ftplogin.json');

var paths = {
  styles: [
    'src/assets/css/normalize.css',
    'src/assets/css/style.scss'
  ],
  scripts: [
    'src/assets/js/classie.js',
    'src/assets/js/script.js',
  ],
  images: 'src/assets/images/*',
  default: 'src/default.hbs',

  copy: {
    root: [
      'src/*.hbs',
      'src/*.json',
      '!src/default.hbs'
    ],
    js: '',
    partials_root: 'src/partials/*.hbs',
    partials_custom: 'src/partials/custom/*.hbs'
  }
};
var pages = [
  'http://localhost:2368/', // HOME
  'http://localhost:2368/about/', // PAGE
  'http://localhost:2368/welcome-to-ghost/', // POST
  'http://localhost:2368/tag/getting-started/', // TAG
  'http://localhost:2368/author/thomas-clausen/', // AUTHOR
  'http://localhost:2368/404/' // ERROR
];

gulp.task('clean', function() {
  return gulp.src(pkg.name, {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat(pkg.name + '.css'))
    .pipe(gulp.dest(pkg.name + '/assets/css'))
    .pipe(cssmin({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'));
});
gulp.task('styles-uncss', function() {
  return gulp.src(paths.styles)
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat(pkg.name + '.css'))
    .pipe(uncss({
      html: pages
    }))
    .pipe(rename({suffix: '.uncss'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'))
    .pipe(cssmin({keepSpecialComments: 0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/css'));
});
gulp.task('styles-test', ['styles'], function() {
  return gulp.src(pkg.name + '/assets/css/' + pkg.name + '.css')
    .pipe(csslint('csslintrc.json'))
    .pipe(csslint.reporter());
});
gulp.task('styles-upload', ['styles'], function() {
  return gulp.src('**', { cwd: path.join(process.cwd(), pkg.name + '/assets/css')})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name + '/assets/css/'
    }));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat(pkg.name + '.js', {newLine: ';'}))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(pkg.name + '/assets/js'));
});
gulp.task('scripts-test', ['scripts'], function() {
  return gulp.src('src/assets/js/script.js')
    .pipe(jshint('jshintrc.json'))
    .pipe(jshint.reporter());
});
gulp.task('scripts-upload', ['scripts'], function() {
  return gulp.src('**', { cwd: path.join(process.cwd(), pkg.name + '/assets/js')})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name + '/assets/js/'
    }));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest(pkg.name + '/assets/images'));
});
gulp.task('images-upload', ['images'], function() {
  return gulp.src('**', { cwd: path.join(process.cwd(), pkg.name + '/assets/images')})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name + '/assets/images/'
    }));
});

gulp.task('copy', function() {
  gulp.src(paths.copy.root)
    .pipe(gulp.dest(pkg.name));
  gulp.src(paths.copy.js)
    .pipe(gulp.dest(pkg.name + '/assets/js/'));
  gulp.src(paths.copy.partials_root)
    .pipe(gulp.dest(pkg.name + '/partials/'));
  gulp.src(paths.copy.partials_custom)
    .pipe(gulp.dest(pkg.name + '/partials/custom/'));
});

gulp.task('replace', function() {
  return gulp.src(paths.default)
    .pipe(htmlreplace({
      css: {
        src: '{{asset "css/' + pkg.name + '.min.css"}}',
        tpl: '<link rel="stylesheet" id="' + pkg.name + '-css" href="%s" />'
      },
      js: {
        src: '{{asset "js/' + pkg.name + '.min.js"}}',
        tpl: '<script type="text/javascript" src="%s" async></script>'
      }
    }))
    .pipe(gulp.dest(pkg.name));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.default, ['replace']);
  gulp.watch(paths.copy.root, ['copy']);
  gulp.watch(paths.copy.fonts, ['copy']);
  gulp.watch(paths.copy.js, ['copy']);
  gulp.watch(paths.copy.partials_root, ['copy']);
  gulp.watch(paths.copy.partials_custom, ['copy']);
});

gulp.task('watch-upload', function() {
  gulp.watch(paths.styles, ['styles-upload']);
  gulp.watch(paths.scripts, ['scripts-upload']);
  gulp.watch(paths.images, ['images-upload']);
  gulp.watch(paths.default, ['files-upload']);
  gulp.watch(paths.copy.root, ['files-upload']);
  gulp.watch(paths.copy.fonts, ['files-upload']);
  gulp.watch(paths.copy.js, ['files-upload']);
  gulp.watch(paths.copy.partials_root, ['files-upload']);
  gulp.watch(paths.copy.partials_custom, ['files-upload']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'replace', 'copy');
});

gulp.task('test', function() {
  gulp.start('styles-test', 'scripts-test');
});

gulp.task('zip', function() {
  return gulp.src('**', { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(zip(pkg.name + '-ghost.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('upload', ['styles', 'scripts', 'images', 'replace', 'copy'], function () {
  return gulp.src('**', { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name
    }));
});

gulp.task('files-upload', ['replace', 'copy'], function() {
  gulp.src('*', { cwd: path.join(process.cwd(), pkg.name)})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name
    }));
  gulp.src('**', { cwd: path.join(process.cwd(), pkg.name + '/assets/fonts/')})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name + '/assets/fonts/'
    }));
  gulp.src('**', { cwd: path.join(process.cwd(), pkg.name + '/assets/js/')})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name + '/assets/js/'
    }));
  gulp.src('**', { cwd: path.join(process.cwd(), pkg.name + '/partials')})
    .pipe(ftp({
      host: ftplogin.host,
      user: ftplogin.user,
      pass: ftplogin.pass,
      remotePath: ftplogin.path + pkg.name + '/partials/'
    }));
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
