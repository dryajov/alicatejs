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
         * @exports alicate/components/repeater
         * @version 1.0
         */
        return Container.extend({
            defaults: function () {
                var props = Container.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * List of components that have been attached to this view.
                     *
                     * @property {Object} generatedChildren
                     */
                    generatedChildren: {},
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
             * The parent of this repeated element
             *
             * @property $parent
             * @type {jQuery}
             */
            $parent: null,
            getMarkup: function () {
                return this.$parent.html();
            },
            /**
             * Called to bind this and children components to the html element
             *
             * @param markupIter
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
             *
             * @param itemCount
             * @param data
             * @param $domElm
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
             *
             * @param item
             * @param $domElm
             */
            bindItemObject: function (item, $domElm) {
                this.onItemRender(item);
                item.bind(Markupiter.createMarkupIter($domElm[0]));
                item.bindModel();
                item.render();
                this.children[item.id] = item;
                this.$parent.append($domElm);
            },
            /**
             * Called when a repeated item is rendered, override this method
             * to attach the components that this repeater is going to repeat
             *
             * @param item
             */
            onItemRender: function (item) {
            }
        });
    }
);