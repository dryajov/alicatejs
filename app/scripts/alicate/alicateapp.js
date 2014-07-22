/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
define(
    [
        'jquery',
        'alicate/router',
        'alicate/base',
        'alicate/components/view'
    ],
    function makeAlicateApp($, Router, Base) {
        'use strict';


        /**
         * A module representing an alicate application
         *
         * @exports alicate/alicateapp
         * @version 1.0
         */
        return Base.extend({
            initialize: function () {
                this.$el = $(this.$selector);

                if (!this.$el) {
                    throw 'Unable to attach to selector ' + this.$selector;
                }

                if (!this.templateStore) {
                    throw 'templateStore not provided!';
                }
            },
            /**
             * The root view of this page
             *
             * @property index
             * @type {String}
             */
            index: null,
            /**
             * The selector to attach this app to
             *
             * @property id
             * @type {String}
             * @default ''
             */
            $selector: '',
            /**
             * the element the app is attached to
             * @type {jquery}
             */
            $el: null,
            /**
             * Collection of views
             *
             * @property {view[]} views
             */
            _views: {},
            /**
             * The templateStore of this application
             *
             * @property {Object} templateStore
             */
            templateStore: null,
            /**
             * Mount a view on a particular path
             *
             * @param {String} path
             * @param {view} view
             * @return {app} Returns this app
             */
            mount: function (path, view) {
                var that = this;
                this._views[path] = view;

                view.template = this.templateStore[view.templateName];
                if (!view.template) {
                    throw 'No template found for ' + view.templateName;
                }

                Router.mount(path, function (params) {
                    that.$el.empty();
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
            start: function (route) {
                Router.go(this.index || route);
            }
        });
    });
