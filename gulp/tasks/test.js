var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('test', function () {
  return gulp.src('.tmp/test/specs.js')
    .pipe(jasmine({
          integration: true,
          //specHtml: __dirname + '/../../__SpecRunner.html',
          keepRunner: true,
          abortOnFail: true,
          includeStackTrace: true
      }));
});
