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
 *
 * NOTE: This is the default implementation,
 * however any other implementation that conforms
 * to the below interface can be used as well
 **/

var page = require('page');

module.exports = {
    /**
     * Initialize the router
     *
     * @param options - an options object for passed
     * to the underlying router implementation
     */
    init: function init(options) {
        page.start(options);
    },
    /**
     * Associate a <pre>View</pre> with a route
     *
     * @param route - The route to associate with
     * @param callback - A callback executed when
     * the route is accessed. The callback receives
     * the params passed in with the route
     *
     */
    mount: function mount(route, callback) {
        page(route, function (ctx) {
            callback(ctx.params);
        });
    },
    /**
     * Triggers the router to load a particular route
     *
     * @param route - The route to trigger
     */
    go: function go(route) {
        page(route);
    }
}
