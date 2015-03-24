/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

var Router = require('./router'),
    Base = require('./base'),
    View = require('./components/view');

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
 *  return app.mount('/link1', new MyView());
 *
 * @module AlicateApp
 * @extends Base
 * @type {object}
 * @exports alicate/alicateapp
 * @version 1.0
 */
module.exports = Base.extend({
        initialize: function initialize() {
            this.$el = $(this.$selector);

            if (!this.$el) {
                throw 'Unable to attach to selector ' + this.$selector;
            }

            if (!this.templateStore) {
                throw 'templateStore not provided!';
            }
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
                throw 'No template found for ' + view.templateName;
            }

            view.isMounted = true;
            Router.mount(path, function (params) {
                view.bind();
                that.$el.empty();
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
            Router.go(route || this.index);
        }
    });
