var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('test', function () {
  return gulp.src('test/specs/**/*.js')
    .pipe(jasmine({
          integration: true,
          keepRunner: true
      }));
});
