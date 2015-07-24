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
    /**
     * Fired when the component is about to be rendered.
     *
     * @param component - the component to be pre-rendered
     */
    preRender: function preRender(component) {
    },
    /**
     * Fired when the component has been rendered.
     *
     * @param component - the component to be post-rendered
     */
    postRender: function postRender(component) {
    },
    /**
     * Fired when a component is entered (activated)
     *
     * @param component - the component to be entered
     */
    onEnter: function onEnter(component) {
    },
    /**
     * Fired when a component is exited (deactivated)
     *
     * @param component - the component to be exit
     */
    onExit: function onExit(component) {
    }
});
