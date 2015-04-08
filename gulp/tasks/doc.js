var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");
var debug = require('gulp-debug');

gulp.task('doc', function (cb) {

    var conf = {
        path: 'ink-docstrap',
        systemName: 'alicatejs',
        copyright: "MIT",
        navType: "vertical",
        theme: "spacelab",
        linenums: true,
        collapseSymbols: false,
        inverseNav: false
    };

    gulp.src(["app/**/*.js", "README.md"])
        .pipe(jsdoc('docs', conf));
});
