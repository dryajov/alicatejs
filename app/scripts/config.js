/**
 * Created by dmitriy.ryajov on 7/8/14.
 */
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
