/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
define(
    [
        'alicate/base'
    ],
    function makeObservable(Base) {
        'use strict';

        /**
         * A module representing an observable
         *
         * @module Observable
         * @exports alicate/observable
         * @extends Base
         * @version 1.0
         */
        return Base.extend({
            initialize: function initialize() {
                this._subscribers = [];
            },
            /**
             * @property {Object[]} _subscribers - Stores the listeners
             * @private
             * @type {Array}
             */
            _subscribers: [],
            /**
             * Subscribe to the current observable
             *
             * @param {Object} subscriber - The object to subscribe to this observable
             */
            subscribe: function subscribe(subscriber) {
                for (var l in this._subscribers) {
                    if (this._subscribers[l] === subscriber) {
                        return;
                    }
                }

                this._subscribers.push(subscriber);
            },
            /**
             * Unsubscribe from the observable
             *
             * @param {Object} listener - The object to unsubscribe
             * @returns {Function} removed listener
             */
            unsubscribe: function unsubscribe(listener) {
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
             * @param {Any} data - The data to be passed to the updated subscriber
             */
            update: function update(data, oldData) {
                for (var l in this._subscribers) {
                    console.log('Triggering update!');
                    this._subscribers[l](data, oldData);
                }
            }
        });
    });
