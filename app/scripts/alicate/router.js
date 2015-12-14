/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

var Base = require('./base');
var page = require('page');

/**
 * A router module.
 *
 * This is the default implementation,
 * however any other implementation that conforms
 * to the below interface can be used as well.
 *
 * @module router.Router
 * @exports Router
 * @version 1.0
 *
 **/
module.exports = Base.extend({
    /**
     * Initialize the router
     *
     * @param options - an options object for passed
     * to the underlying router implementation
     */
    init: function init(options) {
        page.start(options);

        return this;
    },
    /**
     * Associate a {@link view.View|View} with a route
     *
     * @param route - The route to associate with
     * @param callback - A callback executed when
     * the route is accessed. The callback receives
     * the params passed in with the route
     *
     */
    mount: function mount(route, callback) {
        page(route, function (ctx) {
            callback(ctx.pathname, ctx.params, ctx);
        });

        return this;
    },
    /**
     * Triggers the router to load a particular route
     *
     * @param route - The route to trigger
     */
    go: function go(route) {
        page(route);

        return this;
    }
});
