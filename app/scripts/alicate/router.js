/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

/**
 * A module representing a router
 *
 * @module Router
 * @exports alicate/router
 * @version 1.0
 **/

module.exports = {
    mount: function mount(route, callback) {
        page(route, function (ctx) {
            callback(ctx.params);
        });
    },
    go: function go(route) {
        page(route);
    }
};
