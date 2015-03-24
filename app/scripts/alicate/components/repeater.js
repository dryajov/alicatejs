/**
 * Created by dmitriy.ryajov on 6/25/14.
 */

var Container = require('./container'),
    Component = require('./component'),
    Markupiter = require('../markupiter'),
    Model = require('../model'),
    $ = require('jquery');

module.exports = function repeater() {
    'use strict';

    /**
     * A module representing a repeater
     *
     * @module Repeater
     * @exports alicate/components/repeater
     * @extends Container
     * @version 1.0
     */
    return Component.extend({
        instanceData: function instanceData() {
            return {
                /**
                 * @property {Object} components - List of components
                 * that have been attached to this view.
                 */
                _children: []
            };
        },
        /**
         * @property {jQuery} $parent - The parent of this
         * repeated element
         */
        $parent: null,
        /**
         * @override
         */
        _checkIsValidElement: function _checkIsValidElement() {
        },
        /**
         * Return the compiled markup of
         * this component
         *
         * @returns {String}
         */
        getMarkup: function getMarkup() {
            return this.$parent.html();
        },
        /**
         * @param {MarkupIter} markupIter - Called to bind this and children
         * components to the html element
         */
        bind: function bind(markupIter) {
            this.$parent = this.$el.parent().length
                ? this.$el.parent()
                : $('<div/>');

            this.skipNodes(markupIter, markupIter.currentNode);
        },
        skipNodes: function skipNodes(markupIter, lastNode) {
            // Get the next sibling or go up to the
            // parent and get positioned on the next
            // sibling
            if (markupIter.nextSibling()) {
                markupIter.previousNode();
            } else {
                markupIter.lastChild();
                if (lastNode == markupIter.currentNode) {
                    return;
                }
                this.skipNodes(markupIter, markupIter.currentNode);
            }
        },
        /**
         * Bind the component to the html element
         *
         * @param {Component} component
         * @param {jQuery} $element
         */
        bindComponent: function bindComponent(component, $element) {
        },
        /**
         * Render the component
         */
        render: function render() {
            var data = this.getModelData(),
                itemCount = 0,
                $domElm = $('<div/>');

            this._checkIsValidElement();

            if (data) {
                if (Array.isArray(data)) {
                    if (!this.hasRendered) {
                        this.$parent.empty();
                        // remove/detach element from the dom
                        this.$el.remove();
                        for (var prop in data) {
                            $domElm.append(this.itemRender(itemCount, data[prop]));
                            itemCount++;
                        }
                        this.$parent.append($domElm.children());
                    }
                } else {
                    throw 'Model should return an Array!';
                }
            }

            Container.prototype.render.call(this);
        },
        /**
         *
         * @param itemCount
         * @param data
         */
        itemRender: function itemRender(itemCount, data) {
            var $domElm, item;

            $domElm = this.$el.clone();
            item = this.makeItemObject(itemCount, data, $domElm);
            this.bindItemObject(item, $domElm);
            return $domElm;
        },
        /**
         * Make an item object.
         *
         * Overwrite to create a component of any desired type,
         * by default returns a {@link Container}.
         *
         * @param {Integer} itemCount - Current item number
         * @param {Any} data - A model item
         * @param {jQuery} $domElm - jQuery wrapped dom element
         * attached to this item
         * @returns {Container}
         */
        makeItemObject: function makeItemObject(itemCount, data, $domElm) {
            return new Container({
                id: this.id + '-' + itemCount,
                model: new Model({data: data}),
                $el: $domElm,
                parent: this,
                visible: this.isVisible()
            });
        },
        /**
         * Post process an item
         *
         * @param {Component} item - The component to be post processed
         * @param {jQuery} $domElm - The jQuery wrapped dom element
         */
        bindItemObject: function bindItemObject(item, $domElm) {
            this.onItemRender(item);
            item.bind(Markupiter.createMarkupIter($domElm[0]));
            item.bindModel();
            item.render();
            this._children.push(item);
        },
        addItem: function addItemObject(data) {
            this.$parent.append(this.itemRender(this._children.length, data));
        },
        /**
         * Called when a repeated item is rendered, override this method
         * to attach the components that this repeater is going to repeat
         *
         * @param {Container} item - The item to ber rendered
         */
        onItemRender: function onItemRender(item) {
        }
    });
};
