/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'framework/behaviors/behavior',
        'jquery'
    ],
    function (behavior, $) {
        return behavior.extend({
            attach: function (component) {
                var $el = component.$el;

                behavior.prototype.attach.call(this, component);

            }
        });
    });
