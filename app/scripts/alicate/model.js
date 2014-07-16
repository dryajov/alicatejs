/**
 * Created by dmitriy.ryajov on 7/2/14.
 */

/**
 * A module representing a model.
 * @module model
 */
define(
    [
        'alicate/observable'
    ],
    function makeModel(observable) {
        'use strict';

        /**
         * A module representing a module.
         *
         * @exports alicate/model
         * @version 1.0
         */
        return observable.extend({
            /**
             * The data held by this model
             *
             */
            data: '',
            /**
             * Get the data of the model
             *
             * @returns {null}
             */
            get: function () {
                return this.data;
            },
            /**
             * Set the data of the model
             *
             * @param value
             */
            set: function (value) {
                this.data = value;
                this.update(value);
            }
        });
    });
