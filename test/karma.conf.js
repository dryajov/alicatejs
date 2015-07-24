'use strict';

module.exports = function(karma) {
  karma.set({

    frameworks: [ 'jasmine', 'browserify' ],

    files: [
      '../.tmp/test/specs.js'
    ],

    reporters: [ 'dots', 'coverage' ],

    preprocessors: {
      'test/**/*Spec.js': [ 'browserify', 'coverage' ]
    },

    browsers: [ 'PhantomJS' ],

    logLevel: 'LOG_DEBUG',

    singleRun: true,
    autoWatch: false,

    // browserify configuration
    browserify: {
      debug: true,
      transform: [ 'browserify-shim' ]
    }
  });
};
