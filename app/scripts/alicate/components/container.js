/**
 * Created by dmitriy.ryajov on 6/30/14.
 */

'use strict';

var Component = require('./component'),
    $ = require('jquery');

/**
 * @module container
 */

/**
 * A Container allows creating component trees,
 * by  adding other components and containers
 * to its <em>children</em> array.
 *
 * @example
 *
 * var my myContainer = new Container({
 *      id: 'my-container',
 *      children: [
 *          new Label({
 *              id: 'my-label',
 *              text: 'Some text'
 *          }),
 *          new Button({
 *              id: 'my-button',
 *              text: 'Some button'
 *          })
 *      ]
 * }).add(new Image({
 *      id: 'my-image',
 *      src: 'https://raw.githubusercontent.com/dryajov/alicatejs/master/logo.jpg'
 * }))
 *
 * @class container.Container
 * @extends component.Component
 * @version 1.0
 */
var Container = Component.extend(/** @lends container.Container.prototype */{
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
             * List of components that have been attached
             * to this view.
             *
             * @property {Object} - List of components
             *
             * @memberof container.Container
             * @instance
             */
            children: []
        };
    },
    /**
     * Clean the rendered flag. Used when the container wants to
     * force re-render its children.
     */
    cleanRendered: function cleanRendered() {
        for (var i in this.children) {
            if (this.children[i] instanceof Container) {
                this.children[i].cleanRendered();
            }
            this.children[i].hasRendered = false;
        }
    },
    /**
     * Add a component to the container.
     *
     * @param {Component} cpm - Component to be added to this container
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
    /**
     * Append a component to the container.
     * This will put the component at the top
     * of the markup stream that this container
     * controls.
     *
     * @param cmp
     */
    append: function append(cmp) {
        if (this.isBound) {
            this._add(cmp);
            this.$el.append(cmp.$el);
            this.render();
        } else {
            throw new Error('Element not bound, can\'t append!');
        }
    },
    /**
     * Prepend a component to the container.
     * This will put the component at the bottom
     * of the markup stream that this container
     * controls.
     *
     * @param cmp
     */
    prepend: function prepend(cmp) {
        if (this.isBound) {
            this._add(cmp);
            this.$el.preppend(cmp.$el);
            this.render();
        } else {
            throw new Error('Element not bound, can\'t preppend!');
        }
    },
    /**
     * Helper used by append/prepend to add and bind a component
     * @param cmp
     * @private
     */
    _add: function _add(cmp) {
        this.add(cmp);
        cmp.bind();
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

        if (this.isBound) {
            this.render();
        }
    },
    /**
     * Internal method, called to update the visibility of its children.
     * If a child is itself a container, its _updateVisiblity will be also called.
     *
     * @private
     */
    _updateVisiblity: function _updateVisiblity() {
        for (var key in this.children) {
            this.children[key].visible = this.isVisible();
            if (this.children[key] instanceof Container) {
                this.children[key]._updateVisiblity();
            }
        }
    },
    /**
     * Scan the template and attach components to html elements
     *
     * @param {MarkupIter} markupIter - A markup iterator
     * @return {void}
     *
     * @protected
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
            id = $element.data('aid');
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
        cmp.app = this.app;

        cmp.bindModel();
        cmp.bindBehaviors();
    },
    /**
     * Render the component tree
     */
    componentRender: function componentRender() {
        if (this._updateVisiblity) {
            this._updateVisiblity();
        }

        // run through the list of components
        // and render them
        var render = false;
        for (var key in this.children) {
            render = this.children[key].render();
        }

        return render;
    },
    /**
     * Called once when the component is about to become active.
     *
     * This action is typically initiated by a top level container,
     * such as a View or a StackedContainer.
     */
    onEnter: function onEnter() {
        Component.prototype.onEnter.call(this);
        for (var i in this.children) {
            this.children[i].onEnter();
        }
    },
    /**
     * Called once when the component is about to become inactive.
     *
     * This action is typically initiated by a top level container,
     * such as a View or a StackedContainer.
     */
    onExit: function onExit() {
        for (var i in this.children) {
            this.children[i].onExit();
        }
    }
});

module.exports = Container;
