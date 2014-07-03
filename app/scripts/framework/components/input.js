/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        return component.extend({
            render: function () {
                var data;

                if (!this.$el.is("input, textarea, select")) {
                    throw 'Invalid element!';
                }

                if (this.model) {
                    data = this.model.get();
                }

                this.$el.val(data);
            }
        });
    });
