var gulp = require('gulp');
var karma = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
    karma.start({
        configFile: __dirname + '/../../test/karma.conf.js'
        //singleRun: true
    }, done);
});
