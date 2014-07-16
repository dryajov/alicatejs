/**
 * Created by dmitriy.ryajov on 6/25/14.
 */

/**
 * A module representing a repeater
 *
 * @module repeater
 */
define(
    [
        'alicate/components/container',
        'alicate/markupiter'
    ],
    function makeRepeater(container, markupiter) {
        'use strict';

        /**
         * A module representing a repeater
         *
         * @exports alicate/components/repeater
         * @version 1.0
         */
        return container.extend({
            defaults: function () {
                var props = container.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * List of components that have been attached to this view.
                     *
                     * @property {Object} generatedChildren
                     */
                    generatedChildren: {}
                });

                return props;
            },
            /**
             * The parent of this repeated element
             *
             * @property $parent
             * @type {jQuery}
             */
            $parent: null,
            /**
             * Remove the component from this container
             *
             * @param id
             */
            remove: function (id) {
                this.generatedChildren[id].$el.remove();
                delete this.generatedChildren[id];
            },
            /**
             * Called to bind this and children components to the html element
             *
             * @param markupIter
             */
            bind: function (markupIter) {
                this.$parent = this.$el.parent() ||
                    this.$el.appendTo('<div></div>');

                // Get the next sibling or go up to the
                // parent and get positioned on the next
                // sibling
                while (!markupIter.nextSibling()) {
                    if(!markupIter.parentNode()) {
                        return;
                    }
                }

                // we need to backup here 'cause nextSibling will
                // position the stream on the element we have to
                // process next and calling nextNode in the outer loop
                // will skip it
                markupIter.previousNode();
                return;
            },
            /**
             * Bind the component to the html element
             *
             * @param component
             * @param $element
             */
            bindComponent: function (component, $element) {
            },
            /**
             * Render the current component
             */
            render: function () {
                var data = this.getModelData(),
                    $domElm, component, itemCount = 0;

                if (!this.$el.is("div, p, span, li")) {
                    throw 'Invalid element!';
                }

                // remove/detach element from the dom
                this.$parent.html('');
                this.$el.remove();
                if (typeof data !== 'Object') {
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {

                            $domElm = this.$el.clone();

                            // run through the list of components and render them
                            for (var key in this.children) {
                                component = this.children[key];

                                if (typeof component === 'function') {
                                    component = component(data[prop]);
                                    component.$el = $domElm.find('[data-aid=' + component.id + ']');
                                    if (!component.$el) {
                                        throw 'Unable to find elemnt with ID: ' + component.id;
                                    }

                                    component.parent = this;
                                    component.id = component.id + '-' + itemCount; // make new id
                                    component.bindBehaviors();

                                    if (component.getChildrenCount &&
                                        component.getChildrenCount()) {
                                        var markupIter = markupiter.createMarkupIter(component.$el[0]);
                                        component.bind(markupIter);
                                    }

                                    component.visible = this.visible;
                                    component.render();

                                    this.generatedChildren[component.id] = component;
                                } else {
                                    throw 'Repeaters require a constructor function for contained elements.\n' +
                                        'Wrap you component in a function() { return new Label({...}); }';
                                }
                            }
                            this.$parent.append($domElm);
                            itemCount++;
                        }
                    }

                    if (!this.isVisible()) {
                        this.$el && this.$el.hide();
                    } else {
                        this.$el && this.$el.show();
                    }

                } else {
                    throw 'Model should return an Array or Object!';
                }
            },
            onItemRender: function(item) {

            }
        });
    }
);