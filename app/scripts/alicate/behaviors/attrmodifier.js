/**
 * Created by dmitriy.ryajov on 7/14/14.
 */
define(
    [
        'alicate/behaviors/behavior'
    ],
    function makeClickable(Behavior) {
        'use strict';

        /**
         * A module representing a atrrmodifier
         *
         * @module AttrModifier
         * @exports alicate/behaviors/atrrmodifier
         * @extends Behavior
         * @version 1.0
         */
        return Behavior.extend({
            /**
             * @property {Object} attributes - A hash of key/values of the attributes
             */
            attributes: {},
            /**
             * Attaches to the passed component
             *
             * @param {Component} component - Component to attach to
             */
            attach: function (component) {
                Behavior.prototype.attach.call(this, component);
                for (var attr in this.attributes) {
                    component.$el.attr(attr, this.attributes[attr]);
                }
            }
        });
    });
