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
        'alicate/components/component'
    ],
    function makeContainer(component) {
        'use strict';

        /**
         * A module representing a container
         *
         * @exports alicate/components/container
         * @version 1.0
         */
        return component.extend({
            initialize: function () {
                component.prototype.initialize.call(this);
            },
            defaults: function () {
                var props = component.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * List of components that have been attached to this view.
                     *
                     * @property _components
                     * @type {Object}
                     */
                    children: {}
                });

                return props;
            },
            /**
             * Add a component to the view. Components that are not added explicitly
             * are still going to be added by the alicate, and their model will be constructed
             * from the view model if one is provided.
             *
             * @method add
             * @param cpm
             * @return this
             */
            add: function (cpm, id) {
                this.children[cpm.id || id] = cpm;
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
             * Remove the component from this container
             *
             * @param id
             */
            remove: function (id) {
                if (this.children[id].$el) {
                    this.children[id].$el.remove();
                }

                delete this.children[id];
            },
            /**
             * Get a component by id
             *
             * @param id
             * @returns {component}
             */
            get: function (id) {
                return this.children[id];
            },
            /**
             * Get the number of children components
             *
             * @returns {Number}
             */
            getChildrenCount: function () {
                return Object.keys(this.children).length;
            },
            /**
             *
             * @param visible
             */
            setVisible: function (visible) {
                component.prototype.setVisible.call(this, visible);
                this.render();
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            bind: function (markupIter) {
                var id, component,
                    $element;

                while (markupIter.nextNode()) {
                    $element = $(markupIter.currentNode);
                    id = $element.data().aid;
                    if (id && id.length > 0) {
                        component = this.get(id);
                        if (component) {
                            console.log('binding element id ' + id);
                            this.bindComponent(component, $element);
                            if (component.bind) {
                                component.bind(markupIter);
                            }
                        } else {
                             // backup one step so that the next component
                             // picks it up from where we left
                             markupIter.previousNode();
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
            bindComponent: function (component, $element) {
                // if this is a function then call it,
                // it should construct a component
                if (typeof component === 'function') {
                    component = component();
                    this.replace(component);
                }

                component.$el = $element;
                component.parent = this;
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
                for (var key in this.children) {
                    cmp = this.children[key];
                    if (this.children[key].isVisible()) {
                        this.children[key].visible = this.visible;
                    }
                    cmp.render();
                }
            }
        });
    });
