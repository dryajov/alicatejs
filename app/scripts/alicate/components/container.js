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
            instanceData: function instanceData() {
                return {
                    /**
                     * @property {Object} components - List of components
                     * that have been attached to this view.
                     */
                    children: []
                };
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
            add: function add(cpm) {
                this.children.push(cpm);
                return this;
            },
            /**
             * Replace a component with another component
             *
             * @param {Component} cmp - The new component
             * @param {String} id - The id of the component to be replaced
             */
            replace: function replace(newCmp, id) {
                for (var cpm in this.children) {
                    if (this.children[cpm].id === id) {
                        var oldCmp = this.children[cpm];
                        this.children[cpm] = newCmp;
                        return oldCmp;
                    }
                }
            },
            /**
             * Removes a component from this container
             *
             * @param {String} id - Id of the component to be removed
             */
            remove: function remove(id) {
                for (var cpm in this.children) {
                    if (this.children[cpm].id === id) {

                        if (this.isBound) {
                            this.$el.remove(this.children[cpm]);
                        }

                        delete this.children[cpm];
                    }
                }
            },
            /**
             * Get a component by id
             *
             * @param {String} id - Id of the component to retrieve
             * @returns {Component}
             */
            get: function get(id) {
                for (var cpm in this.children) {
                    if (this.children[cpm].id === id) {
                        return this.children[cpm];
                    }
                }
                return null;
            },
            append: function append(cmp) {
                if (this.isBound) {
                    this.add(cmp);
                    this.$el.append(cmp.$el);
                    this.render();
                } else {
                    throw "Element not bound, can't append!";
                }
            },
            preppend: function preppend(cmp) {
                if (this.isBound) {
                    this.add(cmp);
                    this.$el.preppend(cmp.$el);
                    this.render();
                } else {
                    throw "Element not bound, can't preppend!"
                }
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
                Component.prototype.bind.call(this, markupIter);

                var id, cmp,
                    $element;

                if (!markupIter.nextNode()) {
                    return;
                }

                do {
                    $element = $(markupIter.currentNode);
                    id = $element.data().aid;
                    if (id && id.length > 0) {
                        cmp = this.get(id);
                        if (cmp) {
                            console.log('binding element id ' + id);
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
                // bind the model associated with
                // this component
                cmp.bindModel();

                cmp.bindBehaviors();
            },
            /**
             * Render the component tree
             */
            render: function render() {
                // run through the list of components
                // and render them
                for (var key in this.children) {
                    this.children[key].render();
                }

                Component.prototype.render.call(this);
            }
        });
    });
