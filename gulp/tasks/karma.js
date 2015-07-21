var gulp = require('gulp');
var karma = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', ['browserify-test'], function (done) {
    new karma({
        configFile: __dirname + '/../../test/karma.conf.js'
    }, done).start();
});
