/**
 * Created by dmitriy.ryajov on 5/9/15.
 */
'use strict';

var Container = require('./container');

/**
 * @module stacked-container
 */

/**
 * A class representing a StackedContainer.
 *
 * A StackedContainer allows grouping several {@link component.Component|Component}
 * together only showing one at a given time. This makes it ideal for components that
 * show one active view at a time, such as a tabbed controller.
 *
 * @example
 * var listenView = new ListenView({
 *        id: 'listen-view',
 *        visible: true
 *    });
 *
 * var searchView = new SearchView({
 *        id: 'search-view',
 *        visible: false
 *    });
 *
 * var mainView = new Alicate.StackedContainer({
 *        id: 'main-view',
 *        children: [
 *            listenView,
 *            searchView
 *        ]
 *  });
 *
 *  ...
 *
 *  mainView.setActive(0); // set active the listenView
 *
 * @class view.StackedContainer
 * @extends container.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends stacked-container.StackedContainer.prototype */{
  initialize: function initialize() {
    Container.prototype.initialize.call(this);

    // hide components by default
    for (var i in this.children) {
      this.children[i].visible = false;
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
   * Get the current active {@link component.Component|Component}
   *
   * @returns {Component}
   */
  getActive: function getActive() {
    return this.active;
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
        this.active.visible = false;
      }

      this.active = this.children[this.index];
      this.active.visible = true;
      this.active.onEnter();
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
