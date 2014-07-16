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
        'alicate/markupiter',
        'alicate/model'
    ],
    function makeRepeater(container, markupiter, model) {
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
             * Called to bind this and children components to the html element
             *
             * @param markupIter
             */
            bind: function (markupIter) {
                this.$parent = this.$el.parent() ||
                    this.$el.appendTo('<div></div>');

                // remove/detach element from the dom
                this.$el.remove();

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
                    $domElm, component,
                    itemCount = 0, itemContainer,
                    iter;

                if (!this.$el.is("div, p, span, li")) {
                    throw 'Invalid element!';
                }

                this.$parent.html('');
                if (typeof data !== 'Object') {
                    for (var prop in data) {
                        if (data.hasOwnProperty(prop)) {

                            $domElm = this.$el.clone();
                            itemContainer = new container({
                                id: this.id + '-' +itemCount,
                                model: new model({data: data[prop]}),
                                $el: $domElm,
                                parent: this
                            });

                            this.onItemRender(itemContainer);
                            iter = markupiter.createMarkupIter($domElm[0]);
                            iter.nextNode();
                            itemContainer.bind(iter);
                            itemContainer.render();
                            this.children[itemContainer.id] = itemContainer;
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