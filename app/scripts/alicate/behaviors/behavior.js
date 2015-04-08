/**
 * Created by dmitriy.ryajov on 7/1/14.
 */

'use strict';

var Base = require('../../alicate/base');

/**
 * A module representing a behavior
 *
 * @class Behavior
 * @extends Base
 * @version 1.0
 */
module.exports = Base.extend(/** @lends Behavior.prototype */{
    /**
     * @property {String} id -   Any arbitrary identifier for this behavior
     */
    id: '',
    /**
     * @property {Component} component - The component that the behavior is attached to
     */
    component: null,
    /**
     * @property {Boolean} attached - Is this behavior attached
     */
    attached: false,
    /**
     * Attaches to the passed component
     *
     * @param {Component} component - Component to attach to
     */
    attach: function attach(component) {
        this.component = component;
        this.attached = true;
    }
});
