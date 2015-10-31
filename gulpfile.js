'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

var istanbul = require('gulp-istanbul');
// We'll use mocha here, but any test framework will work
var mocha = require('gulp-mocha');

var paths = {
  src: ['./test/**/*.js', './src/**/*.js', './config/*.js'],
  lint: {
    src: ['gulpfile.js', 'app.js', './src/**/*.js', './config/*.js'],
    test: ['./test/**/*.js']
  }
};

gulp.task('lint', function() {
  return gulp.src(paths.lint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  process.env.DATABASE = 'mongodb://localhost:27017/test';
  process.env.NODE_ENV = 'test';
  gulp.src(['src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['tests/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .once('end', function() {
          /*eslint-disable */
          process.exit();
          /*eslint-enable */
        });
    });
});

gulp.task('test-no-cover', function() {
  process.env.DATABASE = 'mongodb://localhost:27017/test';
  process.env.NODE_ENV = 'test';
  gulp.src(['tests/**/*.js'])
    .pipe(mocha())
    .once('end', function() {
      /*eslint-disable */
      process.exit();
      /*eslint-enable */
    });

});

gulp.task('server', function() {
  nodemon({
    script: './bin/www'
  });
});

gulp.task('server-debug', function() {
  nodemon({
    script: './bin/www',
    nodeArgs: ['--debug']
  });
});

gulp.task('debug', ['server-debug'],
  shell.task('node-inspector --web-port=3465'));

gulp.task('default', ['server', 'lint']);
