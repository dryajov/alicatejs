/**
 * Created by dmitriy.ryajov on 7/2/14.
 */
define(
    [
        'alicate/observable'
    ],
    function makeModel(Observable) {
        'use strict';

        /**
         * A module representing a model.
         *
         * @module Model
         * @exports alicate/model
         * @extends Observable
         * @version 1.0
         */
        return Observable.extend({
            /**
             * @property {Any} - The data held by this model
             */
            data: null,
            /**
             * Get the data of the model
             *
             * @returns {Any}
             */
            get: function get() {
                return this.data;
            },
            /**
             * Set the data of the model
             *
             * @param {Any} value - The value to set on this model
             */
            set: function set(value) {
                var oldVal = this.data;
                this.data = value;
                this.update(value, oldVal);
            }
        });
    });
