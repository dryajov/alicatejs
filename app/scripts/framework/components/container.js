/**
 * Created by dmitriy.ryajov on 6/30/14.
 */
define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        return component.extend({
            /**
             * List of components that have been attached to this view.
             * This will be populated by the framework if it was not provided
             * when the view is being defined.
             *
             * @property _components
             * @type {Object}
             */
            _components: {},
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
            get: function (id) {
                return this._components[id];
            },
            /**
             * Scan the template and attach componnents to html elements
             *
             * @return {void}
             */
            process: function ($markup) {
                var DATA_ATTR = '[data-eid]',
                    that = this;

                function processElm() {
                    var id = $(this).data().eid,
                        curComponent;

                    curComponent = that.get(id);
                    curComponent.$el = $(this);

                    if ('process' in curComponent) {
                        curComponent.process($(this));
                    }
                };

                $markup.find(DATA_ATTR).each(processElm);
            }
        });
    });
