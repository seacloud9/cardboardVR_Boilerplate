'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');


gulp.task('run', function() {
                exec('which haxe', function (err, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                        cb(err);
                      });
});