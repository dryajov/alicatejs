/**
 * Created by dmitriy.ryajov on 7/1/14.
 */

/**
 * A module representing an input
 *
 * @module input
 */
define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        /**
         * A module representing an input
         * @exports framework/components/input
         * @version 1.0
         */
        return component.extend({
            /**
             * Render the input component
             *
             */
            render: function () {
                var data;

                if (!this.$el.is("input, textarea, select")) {
                    throw 'Invalid element!';
                }

                if (this.model) {
                    data = this.model.get();
                }

                this.$el.val(data);

                component.prototype.render.call(this);
            }
        });
    });
