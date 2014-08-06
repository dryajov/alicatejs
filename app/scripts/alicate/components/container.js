/**
 * Created by dmitriy.ryajov on 6/30/14.
 */
define(
    [
        'alicate/components/component'
    ],
    function makeContainer(Component) {
        'use strict';

        /**
         * A module representing a container
         *
         * @module Container
         * @exports alicate/components/container
         * @extends Component
         * @version 1.0
         */
        return Component.extend({
            initialize: function initialize() {
                Component.prototype.initialize.call(this);

                for (var key in this.children) {
                    if (this.children[key].isVisible()) {
                        this.children[key].visible = this.visible;
                    }
                }
            },
            defaults: function defaults() {
                var props = Component.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * @property {Object} components - List of components
                     * that have been attached to this view.
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
             * @param {Component} cpm - Component to be added to this container
             * @param {String} id - Id of the component to be added
             * @return this
             */
            add: function add(cpm, id) {
                this.children[cpm.id || id] = cpm;
                return this;
            },
            /**
             * Replace a component with another component
             *
             * @param {Component} cpm - The new component
             * @param {String} id - The id of the component to be replaced
             */
            replace: function replace(cpm, id) {
                return this.add(cpm, id);
            },
            /**
             * Removes a component from this container
             *
             * @param {String} id - Id of the component to be removed
             */
            remove: function remove(id) {
                if (this.children[id].$el) {
                    this.children[id].$el.remove();
                }

                delete this.children[id];
            },
            /**
             * Get a component by id
             *
             * @param {String} id - Id of the component to retrieve
             * @returns {Component}
             */
            get: function get(id) {
                return this.children[id];
            },
            /**
             * Get the number of children components
             *
             * @returns {Number}
             */
            getChildrenCount: function getChildrenCount() {
                return Object.keys(this.children).length;
            },
            /**
             * Set component visibility
             *
             * @param {Boolean} visible - Set visible/hidden
             */
            setVisible: function setVisible(visible) {
                Component.prototype.setVisible.call(this, visible);
                for (var key in this.children) {
                    this.children[key].visible = this.visible;
                }
                this.render();
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @param {MarkupIter} markupIter - A markup iterator
             * @return {void}
             */
            bind: function bind(markupIter) {
                var id, cmp,
                    $element;

                Component.prototype.bind.call(this, markupIter);
                markupIter.nextNode();
                do {
                    $element = $(markupIter.currentNode);
                    id = $element.data().aid;
                    if (id && id.length > 0) {
                        cmp = this.get(id);
                        if (cmp) {
//                            console.log('binding element id ' + id);
                            this.bindComponent(cmp, $element);
                            cmp.bind(markupIter);
                        } else {
                            // backup one step so that the next component
                            // picks it up from where we left
                            markupIter.previousNode();
                            return;
                        }
                    }
                } while (markupIter.nextNode());
            },
            /**
             * Bind the current component to the provided element
             *
             * @param {Component} cmp - The component to bind
             * @param {jQuery} $element - jQuery wrapped dom element
             */
            bindComponent: function bindComponent(cmp, $element) {
                // if this is a function then call it,
                // it should construct a component
                if (typeof cmp === 'function') {
                    cmp = cmp();
                    this.replace(cmp);
                }

                cmp.$el = $element;
                cmp.parent = this;
                // bind the model associated with this component
                if (cmp.model) {
                    cmp.bindModel();
                }

                cmp.bindBehaviors();
            },
            /**
             * Render the component tree
             */
            render: function render() {
                Component.prototype.render.call(this);

                // run through the list of components and render them
                for (var key in this.children) {
                    this.children[key].render();
                }
            }
        });
    });
