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
    function (observable) {
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
            data: null,
            /**
             * Get the data of the model
             *
             * @returns {null}
             */
            get: function () {
                if (this.property && this.property.length > 0) {
                    return this.data[this.property];
                }

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
