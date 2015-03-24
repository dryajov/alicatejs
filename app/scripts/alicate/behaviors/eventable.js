/**
 * Created by dmitriy.ryajov on 7/16/14.
 */

'use strict';

var Behavior = require('./behavior');

/**
 * A module representing a event behavior (hence eventable).
 *
 * @module Eventable
 * @exports alicate/behaviors/eventable
 * @extends Behavior
 * @version 1.0
 */

module.exports = Behavior.extend({
    initialize: function initialize() {
        if (!this.handler) {
            throw 'handler is missing!';
        }

        if (!this.event) {
            throw 'event is missing!';
        }
    },
    /**
     * @property {Function} handler - Callback called on the click event
     * @function
     */
    handler: null,
    /**
     * @property {Event} event - The name of the event to listen for
     */
    event: null,
    /**
     * Attach to a component
     *
     * @param component
     */
    attach: function attach(component) {
        var $el = component.$el,
            that = this;

        Behavior.prototype.attach.call(this, component);
        $el.on(this.event + '.' + component.id, function (event) {
            that.handler.call(component, event);
        });
    }
});

