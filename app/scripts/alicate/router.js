/**
 * Created by dmitriy.ryajov on 6/26/14.
 */

/**
 * @exports alicate/router
 */
define(
    [
        'jquery',
        'pagejs'
    ],
    function makeRouter($, page) {
        'use strict';

        /**
         * A module representing a router
         *
         * @module Router
         * @exports alicate/router
         * @version 1.0
         */
        return {
            mount: function (route, callback) {
                page(route, function (ctx) {
                    callback(ctx.params);
                });
            },
            go: function (route) {
                page(route);
            }
        };
    });
