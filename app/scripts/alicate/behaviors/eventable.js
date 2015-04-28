/**
 * Created by dmitriy.ryajov on 7/16/14.
 */

'use strict';

var Behavior = require('./behavior');

/**
 * @module eventable
 */

/**
 * A class representing an event behavior (hence eventable).
 *
 * @class eventable.Eventable
 * @extends behavior.Behavior
 * @version 1.0
 */
module.exports = Behavior.extend(/** @lends eventable.Eventable.prototype */{
    initialize: function initialize() {
        if (!this.handler) {
            throw new Error('handler is missing!');
        }

        if (!this.event) {
            throw new Error('event is missing!');
        }
    },
    /**
     * @property {Function} - Callback called on the click event
     * @function
     */
    handler: null,
    /**
     * @property {Event} - The name of the event to listen for
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

