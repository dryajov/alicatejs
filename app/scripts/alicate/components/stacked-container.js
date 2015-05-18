/**
 * Created by dmitriy.ryajov on 5/9/15.
 */
'use strict';

var Container = require('./container');

/**
 * @module stacked-container
 */

/**
 * A class representing a StackedView
 *
 * @class view.StackedContainer
 * @extends container.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends stacked-container.StackedContainer.prototype */{
    initialize: function initialize() {
        // hide components by default
        for(var i in this.children) {
            this.children[i].setVisible(false);
        }
    },
    /**
     * Reference to current active view
     *
     * @param {prototype.View}
     */
    active: null,
    /**
     * Active view index
     *
     * @property {Number}
     */
    index: 0,
    /**
     * Set the active view
     */
    setActive: function setActive(index) {
        this.index = index;
        this.render();
    },
    /**
     * @inheritdoc
     */
    render: function render() {
        if (!this.isBound) {
            return;
        }

        if (this.active !== this.children[this.index]) {
            if (this.active !== null) {
                this.active.onExit();
                this.active.setVisible(false);
            }

            this.active = this.children[this.index];
            this.active.onEnter();
            this.active.setVisible(true);
        }

        Container.prototype.render.call(this);
    },
    /**
     * @inheritdoc
     */
    _updateVisiblity: function _updateVisiblity() {
        // void
    }
});
