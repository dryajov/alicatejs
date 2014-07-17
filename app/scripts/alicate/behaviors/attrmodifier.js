/**
 * Created by dmitriy.ryajov on 7/14/14.
 */
define(
    [
        'alicate/behaviors/behavior',
        'jquery'
    ],
    function makeClickable(behavior, $) {
        'use strict';

        return behavior.extend({
            /**
             * A hash of key/values of the attributes
             *
             * @property {Object} attributes
             */
            attributes: {},
            attach: function (component) {
                behavior.prototype.attach.call(this, component);
                for (var attr in this.attributes) {
                    component.$el.attr(attr, this.attributes[attr]);
                }
            }
        });
    });
