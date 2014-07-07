/**
 * Created by dmitriy.ryajov on 6/30/14.
 */

/**
 * A module representing a container
 *
 * @module container
 */
define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        /**
         * A module representing a container
         * @exports framework/components/container
         * @version 1.0
         */
        return component.extend({
            initialize: function () {
                component.prototype.initialize.call(this);
            },
            defaults: function () {
                return {
                    /**
                     * List of components that have been attached to this view.
                     *
                     * @property _components
                     * @type {Object}
                     */
                    components: {}
                }
            },
            /**
             * The template markup from the template store
             *
             * @type {jQuery}
             */
            $_templateMarkup: null,
            /**
             * Get the markup
             *
             * @returns {jQuery}
             */
            getMarkup: function () {
                return this.$_templateMarkup;
            },
            /**
             * Add a component to the view. Components that are not added explicitly
             * are still going to be added by the framework, and their model will be constructed
             * from the view model if one is provided.
             *
             * @method add
             * @param cpm
             * @return this
             */
            add: function (cpm, id) {
                this.components[cpm.id || id] = cpm;
                return this;
            },
            /**
             *
             * @param cpm
             * @param id
             */
            replace: function (cpm, id) {
                return this.add(cpm, id);
            },
            /**
             * Get a component by id
             *
             * @param id
             * @returns {component}
             */
            get: function (id) {
                return this.components[id];
            },
            /**
             * Get the number of children components
             *
             * @returns {Number}
             */
            getChildrenCount: function () {
                return Object.keys(this.components).length;
            },
            /**
             *
             * @param visible
             */
            setVisible: function (visible) {
                component.prototype.setVisible.call(this, visible);

                for (var key in this.components) {
                    this.components[key].setVisible(visible);
                }
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            bind: function (markupIter) {
                var id, component,
                    $element;

                while(markupIter.nextNode())  {
                    $element = $(markupIter.currentNode);
                    if (!$element.data()) {
                        continue;
                    }

                    id = $element.data().eid
                    if (id && id.length > 0) {

                        component = this.get(id);
                        if (component) {
                            console.log('binding element id ' + id);
                            this.bindComponent(component, $element);
                            if (component.getChildrenCount &&
                                component.getChildrenCount()) {
                                component.bind(markupIter);
                            }
                        } else {
                            return;
                        }
                    }
                }

            },
            /**
             * Bind the current component to the provided element
             *
             * @param component
             * @param $element
             */
            bindComponent: function(component, $element) {
                // if this is a function then call it,
                // it should construct a component
                if (typeof component === 'function') {
                    component = component();
                    this.replace(component);
                }

                component.$el = $element;
                // bind the model associated with this component
                if (component.model) {
                    component.bindModel();
                }

                component.bindBehaviors();
            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function () {
                var cmp;

                component.prototype.render.call(this);

                // run through the list of components and render them
                for (var key in this.components) {
                    cmp = this.components[key];

                    // only hide, don't show components depending
                    // on visibility of container
                    if (this.components[key].isVisible()) {
                        this.components[key].visible = this.visible;
                    }

                    cmp.render();
                }
            }
        });
    });
