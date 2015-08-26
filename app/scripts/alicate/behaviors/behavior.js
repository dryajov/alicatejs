/**
 * Created by dmitriy.ryajov on 7/1/14.
 */

'use strict';

var Base = require('../../alicate/base');

/**
 * @module behavior
 */

/**
 * A behavior is a piece of sharable functionality.
 *
 * @class behavior.Behavior
 * @extends base.Base
 * @version 1.0
 */
/*jshint unused:false*/
module.exports = Base.extend(/** @lends behavior.Behavior.prototype */{
    /**
     * @property {String} -   Any arbitrary identifier for this behavior
     */
    id: '',
    /**
     * @property {Component} - The component that the behavior is attached to
     */
    component: null,
    /**
     * @property {Boolean} - Is this behavior attached
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
    },
    detach: function detach() {
        this.attached = false;
    },
    /**
     * Fired when the component is about to be rendered.
     */
    preRender: function preRender() {
    },
    /**
     * Fired when the component has been rendered.
     */
    postRender: function postRender() {
    },
    /**
     * Fired when a component is entered (activated)
     */
    onEnter: function onEnter() {
    },
    /**
     * Fired when a component is exited (deactivated)
     */
    onExit: function onExit() {
    }
});
