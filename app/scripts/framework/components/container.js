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
            initialize: function () {
                component.prototype.initialize.call(this);

                // init with defaults
                this._components = {};
            },
            /**
             * The template markup from the template store
             *
             * @type {jQuery}
             */
            $_templateMarkup: null,
            /**
             * List of components that have been attached to this view.
             * This will be populated by the framework if it was not provided
             * when the view is being defined.
             *
             * @property _components
             * @type {Object}
             */
            _components: null,
            /**
             * Add a component to the view. Components that are not added explicitly
             * are still going to be added by the framework, and their model will be constructed
             * from the view model if one is provided.
             *
             * @method add
             * @param cpm
             * @return this
             */
            add: function (cpm) {
                this._components[cpm.id] = cpm;

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
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            bind: function ($markup) {
                var DATA_ATTR = '[data-eid]',
                    that = this;

                function processElm() {
                    var id = $(this).data().eid,
                        curComponent = that.get(id);

                    curComponent.$el = $(this);
                    if (!curComponent.model &&
                        (that.model && that.model.hasOwnProperty(curComponent.dataProp))) {
                        curComponent.model = that.model[curComponent.dataProp];
                    }

                    // bind the model associated with this component
                    if (curComponent.model) {
                        curComponent.bindModel();
                    }

                    curComponent.onBind();

                    if (curComponent.bind) {
                        curComponent.bind($(this));
                    }
                };

                $markup.find(DATA_ATTR).each(processElm);
            }
        });
    });
