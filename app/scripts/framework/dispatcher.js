/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
define(
    [
        'framework/base'
    ],
    function (base) {
        'use strict';

        return base.extend({
            _listeners: {},
            /**
             *
             * @param event
             * @param callbacks
             */
            bind: function (event, callbacks) {
                if (!this._listeners[event])
                    this._listeners[event] = [];

                this._listeners[event].push(callbacks);
            },
            /**
             *
             * @param event
             */
            unbind: function (event) {
                return this._listeners.pop(event);
            },
            /**
             *
             * @param event
             * @param data
             */
            trigger: function (event, data) {
                var listeners = this._listeners[event];

                if (!listeners) {
                    return;
                }

                for (var i = 0; i < listeners.length; i++) {
                    (listeners[i])(data);
                }
            }
        });
    });
