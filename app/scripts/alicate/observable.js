/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
define(
    [
        'alicate/base'
    ],
    function makeObservable(base) {
        'use strict';

        return base.extend({
            initialize: function () {
                this._subscribers = [];
            },
            /**
             * Stores the listeners
             *
             * @property _subscribers
             * @type {Array}
             */
            _subscribers: null,
            /**
             * Subscribe to the current observable
             *
             * @param subscriber
             */
            subscribe: function (subscriber) {
                for (var l in this._subscribers) {
                    if (this._subscribers.hasOwnProperty(l) &&
                        this._subscribers[l] === subscriber) {
                        return;
                    }
                }

                this._subscribers.push(subscriber);
            },
            /**
             * Unsubscribe from the observable
             *
             * @param listener
             * @returns {Function} removed listener
             */
            unsubscribe: function (listener) {
                for (var l in this._subscribers) {
                    if (this._subscribers.hasOwnProperty(l) &&
                        this._subscribers[l] === listener) {
                        return this._subscribers.pop(l);
                    }
                }
            },
            /**
             * Trigger an update on the listeners with the new data
             *
             * @param data
             */
            update: function (data) {
                for (var l in this._subscribers) {
                    if (this._subscribers.hasOwnProperty(l)) {
                        this._subscribers[l](data);
                    }
                }
            }
        });
    });
