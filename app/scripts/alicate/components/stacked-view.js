/**
 * Created by dmitriy.ryajov on 5/9/15.
 */
'use strict';

var Container = require('./container'),
    $ = require('jquery');

/**
 * @module stacked-view
 */

/**
 * A class representing a StackedView
 *
 * @class view.StackedView
 * @extends container.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends stacked-view.StackedView.prototype */{
    /**
     * Reference to current active view
     *
     * @param {prototype.View}
     */
    activeView: null,
    /**
     * Active view index
     */
    index: 0,
    /**
     *
     */
    render: function render() {

    }
});
