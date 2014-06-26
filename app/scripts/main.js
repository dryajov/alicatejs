require.config({
    baseUrl: 'scripts',
    paths: {
        jquery: '../bower_components/jquery/jquery'
    },
    shims: {
        pagejs: {
            exports: "page"
        }
    }
});

require(['app', 'jquery'], function (app, $, eggplantjs) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
