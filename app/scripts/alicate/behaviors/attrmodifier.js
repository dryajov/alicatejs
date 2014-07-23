/**
 * Created by dmitriy.ryajov on 7/14/14.
 */
define(
    [
        'alicate/behaviors/behavior',
        'jquery'
    ],
    function makeClickable(Behavior, $) {
        'use strict';

        /**
         * A module representing a atrrmodifier
         *
         * @module AttrModifier
         * @exports alicate/behaviors/atrrmodifier
         * @version 1.0
         */
        return Behavior.extend({
            /**
             * A hash of key/values of the attributes
             *
             * @property {Object} attributes
             */
            attributes: {},
            attach: function (component) {
                Behavior.prototype.attach.call(this, component);
                for (var attr in this.attributes) {
                    component.$el.attr(attr, this.attributes[attr]);
                }
            }
        });
    });
