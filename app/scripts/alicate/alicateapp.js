/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
'use strict';

var Base = require('./base'),
    Injector = require('./injectors/opium-injector'),
    Emitter = require('event-emitter');

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
 * return app.add('my-view1', new MyView());
 *
 * @class alicateapp.AlicateApp
 * @extends base.Base
 * @version 1.0
 */
var AlicateApp = Base.extend(/** @lends alicateapp.AlicateApp.prototype */$.extend({
    initialize: function initialize() {
        this.$el = $(this.$selector);
        this.$el.empty(); // override content

        if (!this.$el) {
            throw new Error('Unable to attach to selector ' + this.$selector);
        }

        if (!this.templateStore) {
            throw new Error('templateStore not provided!');
        }

        if (!this.injector) {
            this.injector = new Injector();
        }
    },
    instanceData: function instanceData() {
        return {
            /**
             * The default view the application will load if none is provided
             * to the {@link alicatapp.AlicatApp.start|start()} method.
             *
             * @property {String} index - default view
             */
            index: '',
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
             * of the form of id => view, and it should not be manipulated directly
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
     * This method adds a top level view. A top level view, is one
     *
     * @param {View} view The view to render for that a particular id when calling `setActive`
     * @return {app} Returns this app
     */
    add: function add(view) {
        this._views[view.id] = view;

        view.app = this;
        this.injector.register(view);

        return this;
    },
    /**
     * Set the current active view based on the provided path and params.
     *
     * This method is used by mount to set the active view
     *
     * @param view set the passed view as active
     * @param params {Object.<string, Any>} the parameters passed to this view
     */
    setActiveView: function setActiveView(view, params) {
        if (this.view && this.view.isBound) {
            this.view.exit();
        }

        // detach elements will keep event handles and other data around
        // so that we don't have to rebind everything next time.
        this.$el.contents().detach();

        view.params = params;
        view.app = this;
        view.bind();
        if (view.isBound) {
            view.enter();
        }
        view.render();
        this.$el.append(view.$el);

        this.view = view;

        return this;
    },
    /**
     * Set the current active view based on the provided id
     *
     * @param id the id of the view to be activated
     * @param params {Object.<string, Any>} the parameters passed to this view
     * @returns {*}
     */
    setActive: function setActive(id, params) {
        var view = this._views[id];

        if (!view) {
            throw new Error('View with id: ' + id + ' not found!');
        }

        return this.setActiveView(view, params);
    },
    /**
     * Get the current active View
     *
     * @returns {View}
     */
    getActive: function () {
        return this.view;
    },
    /**
     * This method will trigger the rendering of the app,
     * by setting as active the id specified in the {@link index} member,
     * during app declaration, or by using the id provided as
     * a parameter to this method.
     *
     * @param {String} [id] the initial id of the view to load
     * @param params {Object.<string, Any>} the parameters passed to this view
     */
    start: function start(id, params) {
        if (!this.index && !id) {
            throw new Error('Either the app "index" id or the "id" parameter is required!');
        }

        this.emit('starting');
        this.setActive(id || this.index, params);
        this.emit('started');
    },
    /**
     * Stop application. Triggers the onStopping() hook.
     */
    stop: function stop() {
        this.emit('stopping');

        // reset to null to avoid dangling references
        this.$el = null;
        this._views = null;
        this.emit('stopped');
    }
}, Emitter.methods));

module.exports = AlicateApp;
