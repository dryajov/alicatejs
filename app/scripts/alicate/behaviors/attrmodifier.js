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
             * The name of the attribute
             */
            attr: '',
            /**
             * The value of the attaribute
             */
            val: '',
            attach: function (component) {
                var $el = component.$el;

                behavior.prototype.attach.call(this, component);
                $el.attr(this.attr, this.val);
            }
        });
    });
