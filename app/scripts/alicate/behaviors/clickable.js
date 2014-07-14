/**
 * Created by dmitriy.ryajov on 6/30/14.
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
             * Callback called on the click event
             *
             * @method
             */
            onClick: null,
            attach: function (component) {
                var $el = component.$el;

                behavior.prototype.attach.call(this, component);
                $el.on('click.' + component.id, this.onClick);
            }
        });
    });
