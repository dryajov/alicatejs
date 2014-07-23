/**
 * Created by dmitriy.ryajov on 6/25/14.
 */
define(
    [
        'alicate/components/container',
        'alicate/markupiter',
        'alicate/model'
    ],
    function makeRepeater(Container, Markupiter, Model) {
        'use strict';

        /**
         * A module representing a repeater
         *
         * @module Repeater
         * @exports alicate/components/repeater
         * @extends Container
         * @version 1.0
         */
        return Container.extend({
            defaults: function () {
                var props = Container.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * @property {Object} generatedChildren - List of components that have been attached to this view.
                     */
                    generatedChildren: {},
                    /**
                     * @property {String[]} allowedElements - Elements this component can attach to
                     */
                    allowedElements: [
                        "div",
                        "p",
                        "span",
                        "li",
                        "option"
                    ]
                });

                return props;
            },
            /**
             * @property {jQuery} $parent - The parent of this repeated element
             */
            $parent: null,
            /**
             * Return the compiled markup of
             * this component
             *
             * @returns {String}
             */
            getMarkup: function () {
                return this.$parent.html();
            },
            /**
             * @param {MarkupIter} markupIter - Called to bind this and children components to the html element
             * @method bind
             */
            bind: function (markupIter) {
                this.$parent = this.$el.parent().length
                    ? this.$el.parent()
                    : $('<div/>');

                // Get the next sibling or go up to the
                // parent and get positioned on the next
                // sibling
                if (markupIter.nextSibling()) {
                    markupIter.previousNode();
                } else {
                    markupIter.lastChild();
                }

                return;
            },
            /**
             * Bind the component to the html element
             *
             * @param {Component} component
             * @param {jQuery} $element
             * @method bindComponent
             */
            bindComponent: function (component, $element) {
            },
            /**
             * Render the current component
             *
             * @method render
             */
            render: function () {
                var data = this.getModelData(),
                    $domElm,
                    itemCount = 0,
                    item;

                this._checkIsValidElement();

                this.$parent.html('');
                // remove/detach element from the dom
                this.$el.remove();
                if (typeof data !== 'Object') {
                    for (var prop in data) {
                        $domElm = this.$el.clone();
                        item = this.makeItemObject(itemCount, data[prop], $domElm);
                        this.bindItemObject(item, $domElm);
                        this.$parent.append($domElm);
                        itemCount++;
                    }
                } else {
                    throw 'Model should return an Array or Object!';
                }

                if (!this.isVisible()) {
                    this.$el && this.$el.hide();
                } else {
                    this.$el && this.$el.show();
                }
            },
            /**
             * Make an item object.
             *
             * Overwrite to create a component of any desired type,
             * by default returns a {@link Container}.
             *
             * @param {Integer} itemCount - Current item number
             * @param {Any} data - A model item
             * @param {jQuery} $domElm - jQuery wrapped dom element attached to this item
             * @returns {Container}
             */
            makeItemObject: function (itemCount, data, $domElm) {
                return new Container({
                    id: this.id + '-' + itemCount,
                    model: new Model({data: data}),
                    $el: $domElm,
                    parent: this
                });
            },
            /**
             * Post process an item
             *
             * @param {Component} item - The component to be post processed
             * @param {jQuery} $domElm - The jQuery wrapped dom element
             */
            bindItemObject: function (item, $domElm) {
                this.onItemRender(item);
                item.bind(Markupiter.createMarkupIter($domElm[0]));
                item.bindModel();
                item.render();
                this.children[item.id] = item;
            },
            /**
             * Called when a repeated item is rendered, override this method
             * to attach the components that this repeater is going to repeat
             *
             * @param {Container} item - The item to ber rendered
             */
            onItemRender: function (item) {
            }
        });
    }
);