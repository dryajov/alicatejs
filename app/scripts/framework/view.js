/**
 * @class view
 *
 * Defines a view that renders components and other views
 */
define(
'framework/view',
[
    'framework/component',
    'framework/scanner'
],
function(component, scanner) {
        'use strict';

        var PRE = 'pre', POST = 'post';

        return component.extend({
            /**
             * The name of the template that this view renders
             *
             * @property template
             * @type {String}
             */
            template: '',
            /**
             * The template markup from the template store
             *
             * @type {jQuery}
             */
            $templateMarkup: null,
            /**
             * List of components that have been attached to this view.
             * This will be populated by the framework if it was not provided
             * when the view is being defined.
             *
             * @propery _components
             * @type {Object}
             */
            _components: {},
            /**
             * Indicates if this view has been already processed.
             * Processed, means that this views tamplate has been scanned
             * and all the componnents attached to its particular html element
             *
             * @type {Boolean}
             */
            _processed: false,
            /**
             * Scan the template and attach componnents to html elements
             *
             * @return {void}
             */
            _process: function() {
                scanner.scan(this.$templateMarkup, this);

                this._processed = true;
            },
            /**
             * Add a component to the view. Components that are not added explicitly
             * are still going to be added by the framework, and their model will be constructed
             * from the view model if one is provided.
             *
             * @method add
             * @param component
             * @return this
             */
            add: function (component) {
                this._components[component.id] = component;

                return this;
            },
            /**
             * Get a component by id
             *
             * @param id
             * @returns {component}
             */
            get: function(id) {
                return this._components[id];
            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function(params, callback) {
                var component;

                if (!this._processed)
                    this._process();

                // call pre callback
                if (callback)
                    callback(PRE, this);

                // run through the list of components and render them
                for(var key in this._components) {
                    component = this._components[key]

                    if (this._components.hasOwnProperty(key)) {
                        component.render();

                        this.$templateMarkup.replaceWith(component);
                    }
                }

                if (callback)
                    callback(POST, this);

                return this.$templateMarkup;
            }
        });
});
