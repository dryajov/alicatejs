var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");
var debug = require('gulp-debug');

gulp.task('doc', function (cb) {
    gulp.src("app/scripts/**/*.js")
        .pipe(jsdoc('docs'))
});
