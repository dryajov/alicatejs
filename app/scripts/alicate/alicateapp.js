/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

var Router = require('./router'),
    Base = require('./base'),
    Injector = require('./injectors/opium-injector'),
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
var AlicateApp = Base.extend(/** @lends alicateapp.AlicateApp.prototype */{
    initialize: function initialize() {
        this.$el = $(this.$selector);
        this.$el.empty();

        if (!this.$el) {
            throw new Error('Unable to attach to selector ' + this.$selector);
        }

        if (!this.templateStore) {
            throw new Error('templateStore not provided!');
        }

        if (!this.router) {
            this.router = new Router();
            this.router.init();
        }

        if (!this.injector) {
            this.injector = new Injector();
        }
    },
    instanceData: function instanceData() {
        return {
            /**
             * The default route the application will load if none is provided
             * to the {@link alicatapp.AlicatApp.start|start()} method.
             *
             * @property {String} index - default route
             */
            index: null,
            /**
             * This is the css selector that the app will attach itself to.
             *
             * @property {String} id - css selector
             */
            $selector: '',
            /**
             * This is the jquery wrapped dom element that this app is attached to
             *
             * @property {jQuery} $el - jquery wrapped dom element
             */
            $el: null,
            /**
             * The collection of mounted _views of this app. This is a key/value store,
             * of the form of route => view, and it should not be manipulated directly
             *
             * @property {View[]} _views - Collection of _views
             * @private
             */
            _views: {},
            /**
             * This is the key/value store of html fragments that the application uses
             * to render its views. It takes the form of 'template name' => 'html fragment',
             * where template name should correspond to the templateName property in one of
             * the views.
             *
             * @property {Object} templateStore - key/value store of html fragments
             */
            templateStore: null,
            /**
             * The router used by this app. Override on application declaration
             * to provide a custom router
             *
             * @property {Router} router - a router
             */
            router: null,
            /**
             * Current active view
             *
             * @property {View}
             */
            view: null,
            /**
             * Injector called during view activation
             *
             * @property {Injector}
             */
            injector: null
        };
    },
    /**
     * This method, associates a view with a route. The route is any url
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
        this._views[path] = view;

        view.isMounted = true;
        this.router.mount(path, AlicateApp.prototype.setActiveView.bind(this, view));
        view.id = path; // set id to path
        this.injector.register(view);

        return this;
    },
    /**
     * Set the current active view based on the provided path and params.
     *
     * This method is used by mount to set the active view
     *
     * @param path
     * @param params
     */
    setActiveView: function setActiveView(view, path, params, ctx) {
        if (this.view && this.view.isBound) {
            this.view.exit();
        }

        // detach elements will keep event handles and other data around
        // so that we don't have to rebind everything next time.
        this.$el.contents().detach();

        view.path = path;
        view.params = params;
        view.ctx = ctx;
        view.app = this;
        view.bind();
        if (view.isBound) {
            view.enter();
        }
        view.render();
        this.$el.append(view.$el);

        this.view = view;
    },
    /**
     * This method will trigger the rendering of the app,
     * by firing the location specified in the {@link index} member,
     * during app declaration, or by using the route provided as
     * a parameter to this method.
     *
     * @param {String} [route] the initial route to load
     */
    start: function start(route) {
        this.onStarting();
        this.router.go(route || this.index);
        this.onStarted();
    },
    /**
     * Stop application. Triggers the onStopping() hook.
     */
    stop: function stop() {
        this.onStopping();

        // reset to null to avoid dangling references
        this.$el = null;
        this._views = null;
        this.onStopped();
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
     * Called once application has been started
     */
    onStarted: function onStarted() {
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
    },
    /**
     * Called once application has been stopped
     */
    onStopped: function onStopped() {
    },
    /**
     *
     * @param route
     */
    go: function go(route) {
        this.router.go(route)
    }
});

module.exports = AlicateApp;
