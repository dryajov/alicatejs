/**
 * Created by dmitriy.ryajov on 7/16/14.
 */
define(
    [
        'alicate/behaviors/behavior',
        'jquery'
    ],
    function makeClickable(behavior, $) {
        'use strict';

        return behavior.extend({
            initialize: function() {
                if (!this.handler) {
                    throw 'handler is missing!';
                }

                if (!this.event) {
                    throw 'event is missing!';
                }
            },
            /**
             * Callback called on the click event
             *
             * @function
             */
            handler: null,
            /**
             * The name of the event to listen for
             */
            event: null,
            /**
             * Attach to a component
             *
             * @param component
             */
            attach: function (component) {
                var $el = component.$el,
                    that = this;

                behavior.prototype.attach.call(this, component);
                $el.on(this.event + '.' + component.id, function () {
                    that.handler.call(component)
                });
            }
        });
    });
