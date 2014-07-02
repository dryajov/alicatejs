/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
define(
    [
        'framework/dispatcher'
    ],
    function (dispatcher) {
        'use strict';

        var EVENT_CHANGED = 'changed';
        return dispatcher.extend({
            /**
             * The data held by this model
             *
             * @property data
             * @type {Object}
             */
            data: null,
            /**
             * Gets the underlying data held by this <tt>model</tt>
             *
             * When returning the data object, this method will first determine
             * if <tt>data</tt> is a function, if it is it will call it and return
             * the its results
             *
             * @returns {Object}
             */
            getData: function () {
                if (typeof this.data === 'function')
                    return this.data();

                return this.data;
            },
            /**
             * Set the data for this <tt>model</tt>
             *
             * This will also call <tt>refresh</tt> on the current model causing
             * any listeners attached to it to be triggered
             *
             * @param {Object} data
             */
            setData: function (data) {
                if (data !== this.getData()) {
                    if (this.data && typeof this.data === 'function') {
                        this.data(data);
                    } else if (this.data && typeof this.data === 'object') {
                        for(var prp in data){
                            if (this.data.hasOwnProperty(prp)) {
                                if (typeof this.data[prp] === 'function') {
                                    this.data[prp](typeof this.data[prp] === 'function' ?
                                        data[prp]() : data[prp]);
                                } else {
                                    this.data[prp] = data[prp];
                                }
                            }
                        }
                    } else {
                        this.data = data;
                    }
                    this.refresh();
                }
            },
            /**
             * Attaches a listener to changes made to this model
             *
             * @param {Function} callbacks
             */
            listen: function (callbacks) {
                this.bind(EVENT_CHANGED, callbacks);
            },
            /**
             * This will call any listeners attached to this model
             */
            refresh: function () {
                this.trigger(EVENT_CHANGED, this.data);
            }
        });
    });
