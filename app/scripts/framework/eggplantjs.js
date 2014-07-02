define(
    'framework/eggplantjs',
    [
        'jquery',
        'framework/router',
        'framework/base'
    ],
    function ($, router, base) {
        'use strict';

        return base.extend({
            /**
             * The name of the current app
             *
             * @property {string} name
             * @default ''
             */
            name: '',
            /**
             * The selector to attach this app to
             *
             * @property {String} id
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
             * @type {Object}
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

                router.page(path, function (ctx) {
                    var params = ctx.params;

                    that.$el.empty();
                    that.$el.append(view.render(params));
                });
                return this;
            },
            /**
             * Start application
             *
             * @return {app} Returns this app
             */
            start: function (path) {
                router.page(path);
                router.page();
            },
            initialize: function () {
                this.$el = $(this.$selector);

                if (!this.$el)
                    throw 'Unable to attach to selector ' + this.$selector;

                if (!this.templateStore)
                    throw 'templateStore not provided!';
            }
        });
    });
