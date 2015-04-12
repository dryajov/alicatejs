/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

var Router = require('./router'),
    Base = require('./base'),
    View = require('./components/view'),
    $ = require('jquery');

/**
 * A module representing an alicate application
 *
 * <p>
 * This module provides an entry point to your alicate applications.
 *
 * It allows mounting {@link View}'s on desired paths
 * and provides a way to bind the application to a particular element in the dom,
 * using a css selector.
 * <p>
 *
 * @example
 * var app = new AlicateApp({
 *                  templateStore: templates,
 *                  $selector: '#selector'
 *              });
 *
 * return app.mount('/link1', new MyView());
 *
 * @class AlicateApp
 * @extends Base
 * @version 1.0
 */
module.exports = Base.extend(/** @lends AlicateApp.prototype */{
    initialize: function initialize() {
        this.$el = $(this.$selector);

        if (!this.$el) {
            throw new Error('Unable to attach to selector ' + this.$selector);
        }

        if (!this.templateStore) {
            throw new Error('templateStore not provided!');
        }

        this.router.init();
    },
    /**
     * @property {String} index - The index view of this page
     */
    index: null,
    /**
     * @property {String} id - The selector to attach this app to
     */
    $selector: '',
    /**
     * @property {jQuery} $el - The element the app is attached to
     */
    $el: null,
    /**
     * @property {View[]} views - Collection of views
     */
    views: {},
    /**
     * @property {Object} templateStore - The templateStore of this application
     */
    templateStore: null,
    /**
     * @property {Router} router - The router used by this app
     */
    router: Router,
    /**
     * Associate a view with a route
     *
     * @param {String} path
     * @param {View} view
     * @return {app} Returns this app
     */
    mount: function mount(path, view) {
        var that = this;
        this.views[path] = view;

        view.template = this.templateStore[view.templateName];
        if (!view.template) {
            throw new Error('No template found for ' + view.templateName);
        }

        view.isMounted = true;
        this.router.mount(path, function (params) {
            that.$el.empty();
            view.params = params;
            view.app = that;
            view.bind();
            view.render();
            that.$el.append(view.$el);
        });

        return this;
    },
    /**
     * Start application
     *
     * @param {String} route optional param
     * representing the initial route to load
     */
    start: function start(route) {
        this.onStarting();
        this.router.go(route || this.index);

        var that = this;
        $(window).unload(function () {
            that.stop();
        });
    },
    /**
     * Stop application
     */
    stop: function stop() {
        this.onStopping();

        // reset to null to avoid dangling references
        this.$el = null;
        this.views = null;
    },
    /**
     * Called before application has started
     */
    onStarting: function onStarting() {
    },
    /**
     * Called before the application has stopped.
     *
     * This is attach to the `window` unload event
     * as well as when calling the stop method explicitly
     */
    onStopping: function onStopping() {
    }
});
