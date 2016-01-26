/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    git = require("gulp-git"),  
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    rimraf = require('rimraf'),
    project = require("./project.json");

var paths = {
    webroot: "./" + project.webroot + "/",
    gitlib: "../../git-lib"
};
var libs = {

};
paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.vendorCss = "css/vendor/**/*.css";

libs.bootstrapv3 = "https://github.com/twbs/bootstrap.git";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

///New tasks
gulp.task("git:clone", function () {
    git.clone(libs.bootstrapv3, { args: '--branch v4-dev --single-branch' , cwd: paths.gitlib + '/bootstrapv4/' }, function (err) {
        if (err) throw err;
    });
});

gulp.task("git:pull", function () {
    git.pull('origin', 'v4-dev', { cwd: paths.gitlib + "/bootstrapv4/bootstrap" }, function (err) {
        if (err) throw err;
    });
});

gulp.task('less:bootstrap', function () {
    gulp.src(paths.gitlib + '/bootstrapv3/less/bootstrap.less')
      .pipe(less({ paths: [paths.gitlib + '/bootstrap/less/'] }))
      .pipe(gulp.dest(paths.webroot + 'css/vendor/'));
});

gulp.task('sass:bootstrap', function() {
    gulp.src(paths.gitlib + '/bootstrapv4/bootstrap/scss/bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.webroot + 'css/vendor/'));
});