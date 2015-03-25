/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

/**
 * A module representing a router
 * @module Router
 * @exports alicate/router
 * @version 1.0
 *
 * NOTE: This is the default implementation,
 * however any other implementation that conforms
 * to the below interface can be used as well
 **/

var page = require('page');

module.exports = {
    init: function init(options) {
        page.start(options);
    },
    mount: function mount(route, callback) {
        page(route, function (ctx) {
            callback(ctx.params);
        });
    },
    go: function go(route) {
        page(route);
    }
}
