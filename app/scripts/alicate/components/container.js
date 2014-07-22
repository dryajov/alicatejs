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
         * @exports alicate/components/container
         * @version 1.0
         */
        return Component.extend({
            initialize: function () {
                Component.prototype.initialize.call(this);

                for (var key in this.children) {
                    if (this.children[key].isVisible()) {
                        this.children[key].visible = this.visible;
                    }
                }
            },
            defaults: function () {
                var props = Component.prototype.defaults.call(this);

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
                Component.prototype.setVisible.call(this, visible);
                for (var key in this.children) {
                    this.children[key].visible = this.visible;
                }
                this.render();
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            bind: function (markupIter) {
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
             * @param cmp
             * @param $element
             */
            bindComponent: function (cmp, $element) {
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
             *
             * @method render
             */
            render: function () {
                var cmp;

                Component.prototype.render.call(this);

                // run through the list of components and render them
                for (var key in this.children) {
                    cmp = this.children[key];
                    cmp.render();
                }
            }
        });
    });
