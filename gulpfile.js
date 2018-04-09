var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json');
gulp.task('build', function () {
    var tsResult = tsProject.src()
    .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('lib')),
        tsResult.js.pipe(gulp.dest('lib'))
    ]);
});