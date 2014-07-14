define(
    'alicate/router',
    [
        'jquery',
        'pagejs'
    ],
    function makeRouter($, page) {
        'use strict';

        return {
            mount: function (route, callback) {
                page(route, function(ctx){
                    callback(ctx.params);
                });
            },
            go: function(route) {
                page(route);
            }
        };
    });
