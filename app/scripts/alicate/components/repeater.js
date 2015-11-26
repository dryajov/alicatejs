/**
 * Created by dmitriy.ryajov on 6/25/14.
 */

/**
 * @module repeater
 */

'use strict';

var Container = require('./container'),
    Markupiter = require('../markupiter'),
    Model = require('../model'),
    $ = require('jquery');

/**
 * A Repeater allows iterating over a list of elements
 * set on its <em>model</em> property, the <em>onItemRender</em> method
 * is then called for each element in the list, with a <em>Container</em>
 * passed as its instance parameter, it is then possible to add elements
 * to the container, hence generating new components at runtime. This component
 * is used to render lists of elements, such as
 * <code>&lt;ul&gt;&lt;li&gt;&lt;/li&gt;&lt;/ul&gt;</code> elements.
 *
 * @example
 * new Repeater({
 *       id: 'my-rptr2',
 *       model: new Model({data: [1, 2, 3]}),
 *       onItemRender: function (item) {
 *           item.add(new Label({
 *               id: 'my-label2',
 *               text: 'Hello World'
 *           }));
 *       }
 *   })
 *
 * @class repeater.Repeater
 * @extends component.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends repeater.Repeater.prototype */{
    instanceData: function instanceData() {
        return {
            /**
             * @property {Object} - List of components
             * that have been attached to this view.
             *
             * @memberof repeater.Repeater
             * @instance
             */
            _children: [],
            /**
             * @property {jQuery} - The parent of this
             * repeated element
             *
             * @memberof repeater.Repeater
             * @instance
             */
            $parent: null,
            /**
             * Should we render the components list
             *
             * This flag control if the list should be
             * regenerated on the next render or left alone
             *
             * @property {Boolean}
             */
            doRender: true,
            /**
             * @property {Number} - Current items count
             *
             * This is reset every-time the repeater is re-rendered
             */
            itemCount: 0
        };
    },
    /**
     * Append an item to the repeater.
     * Note that this does not alter the internal model,
     * so any aditional items added here, would also need
     * to be manually added to the model.
     *
     * @param data
     */
    append: function append(data) {
        this.$parent.append(this.itemRender(this.itemCount++, data));
    },
    /**
     * Prepend an item to the repeater.
     * Note that this does not alter the internal model,
     * so any aditional items added here, would also need
     * to be manually added to the model
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

        if (this.app && this.app.injector) {
            this.app.injector.register(this);
            this.app.injector.inject(this);
        }
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
            if (lastNode === markupIter.currentNode) {
                return;
            }
            this.skipNodes(markupIter, markupIter.currentNode);
        }
    },
    /**
     * Render the component
     */
    render: function render() {
        var data, $domElm;

        if (!this.isBound) {
            return;
        }

        data = this.getModelData();
        $domElm = $('<div/>');

        this._checkIsValidElement();

        if (data) {
            if (Array.isArray(data)) {
                if (!this.hasRendered && this.visible && this.doRender) {
                    this.children = [];
                    this.$parent.empty();
                    // remove/detach element from the dom
                    this.$el.remove();
                    this.itemCount = 0;
                    for (var prop in data) {
                        $domElm.append(this.itemRender(this.itemCount, data[prop]));
                        this.itemCount++;
                    }
                    this.$parent.append($domElm.children());
                    this.doRender = false; // only rerender if model changed or rendering for the first time
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
            visible: this.isVisible(),
            app: this.app
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
        this.children.push(item);
    },
    /**
     * Called when a repeated item is rendered, override this method
     * to attach the components that this repeater is going to repeat
     *
     * @param {Container} item - The item to ber rendered
     */
    onItemRender: function onItemRender() {
    },
    /**
     * @inheritDoc
     */
    onModelChanged: function onModelChanged() {
        this.doRender = true;
    }
});
