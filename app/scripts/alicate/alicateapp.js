/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

var Router = require('./router'),
    Base = require('./base'),
    View = require('./components/view'),
    $ = require('jquery');

/**
 * @module alicateapp
 */

/**
 * This class provides an entry point to your alicate applications.
 * It allows mounting {@link view.View|View}'s on desired paths,
 * and using a css selector, it provides a way to bind the application
 * to a particular element in the dom, as well as exposes hooks into
 * the initialization/de-initialization process of the app.
 *
 * @example
 * var app = new AlicateApp({
 *                  templateStore: templates,
 *                  $selector: '#selector'
 *              });
 *
 * return app.mount('/link1', new MyView());
 *
 * @class alicateapp.AlicateApp
 * @extends base.Base
 * @version 1.0
 */
module.exports = Base.extend(/** @lends alicateapp.AlicateApp.prototype */{
    initialize: function initialize() {
        this.$el = $(this.$selector);
        this.$el.empty();

        if (!this.$el) {
            throw new Error('Unable to attach to selector ' + this.$selector);
        }

        if (!this.templateStore) {
            throw new Error('templateStore not provided!');
        }

        this.router.init();
    },
    /**
     * The default route the application will load if none is provided
     * to the {@link alicatapp.AlicatApp.start|start()} method.
     *
     * @property {String} - default route
     */
    index: null,
    /**
     * This is the css selector that the app will attach itself to.
     *
     * @property {String} - css selector
     */
    $selector: '',
    /**
     * This is the jQuery wrapped dom element that this app is attached to
     *
     * @property {jQuery} - jquery wrapped dom element
     */
    $el: null,
    /**
     * The collection of mounted _views of this app. This is a key/value store,
     * of the form of route => view, and it should not be manipulated directly
     *
     * @property {View[]} - Collection of _views
     * @private
     */
    _views: {},
    /**
     * This is the key/value store of html fragments that the application uses
     * to render its views. It takes the form of 'template name' => 'html fragment',
     * where template name should correspond to the templateName property in one of
     * the views.
     *
     * @property {Object} - key/value store of html fragments
     */
    templateStore: null,
    /**
     * The router used by this app. Override on application declaration
     * to provide a custom router
     *
     * @property {Router} - a router
     */
    router: Router,
    /**
     * This method associates a view with a route. The route is any url
     * fragment that the application wants to respond to. By default, alicatejs uses
     * {@link https://visionmedia.github.io/page.js/|page.js},
     * however it is possible to override it with an alternative
     * implementation provided that it implements the {@link router.Router} interface.
     * Parameters defined by the route will be passed to the
     * {@link view.View.params|View.params} property.
     *
     * @param {String} path The route to be monitored by alicatejs
     * @param {View} view The view to render for this route
     * @return {app} Returns this app
     */
    mount: function mount(path, view) {
        var that = this;
        this._views[path] = view;

        view.template = this.templateStore[view.templateName];
        if (!view.template) {
            throw new Error('No template found for ' + view.templateName);
        }

        view.isMounted = true;
        this.router.mount(path, function (params) {
            // detach elements will keep event handles and other data around
            // so that we don't have to rebind everything next time.
            that.$el.contents().detach();
            view.params = params;
            view.app = that;
            view.bind();
            view.render();
            that.$el.append(view.$el);
        });

        return this;
    },
    /**
     * This method will trigger the rendering of the app
     * by firing the location specified in the
     * {@link alicateapp.AlicateApp.index|index} member during app declaration,
     * or by using the route provided as a parameter to this method.
     *
     * @param {String} [route] the initial route to load
     */
    start: function start(route) {
        this.onStarting();
        this.router.go(route || this.index);
    },
    /**
     * Stop application. Triggers the onStopping() hook.
     */
    stop: function stop() {
        this.onStopping();

        // reset to null to avoid dangling references
        this.$el = null;
        this._views = null;
    },
    /**
     * <p>Called before the application has started.</p>
     *
     * <p>Use this to perform any additional initialization
     * that your application might require,
     * such as authentication/authorization</p>
     */
    onStarting: function onStarting() {
    },
    /**
     * <p>Called before the application has stopped.</p>
     *
     * <p>
     * Use it to perform any required cleanup or de-initialization,
     * such as invalidating the session, etc...
     * </p>
     */
    onStopping: function onStopping() {
    }
});
