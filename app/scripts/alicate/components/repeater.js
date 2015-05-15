/**
 * Created by dmitriy.ryajov on 6/25/14.
 */

'use strict';

var Container = require('./container'),
    Component = require('./component'),
    Markupiter = require('../markupiter'),
    Model = require('../model'),
    $ = require('jquery');

/**
 * @module repeater
 */

/**
 * A class representing a repeater
 *
 * @class repeater.Repeater
 * @extends component.Component
 * @version 1.0
 */
module.exports = Component.extend(/** @lends repeater.Repeater.prototype */{
    instanceData: function instanceData() {
        return {
            /**
             * @property {Object} components - List of components
             * that have been attached to this view.
             *
             * @memberof repeater.Repeater
             * @instance
             */
            _children: [],
            /**
             * @property {jQuery} $parent - The parent of this
             * repeated element
             *
             * @memberof repeater.Repeater
             * @instance
             */
            $parent: null
        };
    },
    /**
     * @property {Number} - Current items count
     *
     * This is reset every-time the repeater is re-rendered
     */
    itemCount: 0,
    /**
     * Append an item to the repeater
     *
     * @param data
     */
    append: function append(data) {
        this.$parent.append(this.itemRender(this.itemCount++, data));
    },
    /**
     * Prepend an item to the repeater
     *
     * @param data
     */
    prepend: function prepend(data) {
        this.$parent.prepend(this.itemRender(this.itemCount++, data));
    },
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

        this.isBound = true;
    },
    /**
     * Skip all child nodes
     *
     * @private
     * @param markupIter
     * @param lastNode
     */
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
     * Render the component
     */
    render: function render() {
        var data = this.getModelData(),
            $domElm = $('<div/>');

        if (!this.isBound) {
            return;
        }

        this._checkIsValidElement();

        if (data) {
            if (Array.isArray(data)) {
                if (!this.hasRendered) {
                    this._children = [];
                    this.$parent.empty();
                    // remove/detach element from the dom
                    this.$el.remove();
                    this.itemCount = 0;
                    for (var prop in data) {
                        $domElm.append(this.itemRender(this.itemCount, data[prop]));
                        this.itemCount++;
                    }
                    this.$parent.append($domElm.children());
                }
            } else {
                throw new Error('Model should return an Array!');
            }
        }

        this.isBound = true;
        return Container.prototype.render.call(this);
    },
    /**
     * Render the current item.
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
    /**
     * Called when a repeated item is rendered, override this method
     * to attach the components that this repeater is going to repeat
     *
     * @param {Container} item - The item to ber rendered
     */
    onItemRender: function onItemRender(item) {
    }
});
