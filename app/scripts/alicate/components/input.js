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
        'alicate/components/component'
    ],
    function (component) {
        'use strict';

        /**
         * A module representing an input
         *
         * @exports alicate/components/input
         * @version 1.0
         */
        return component.extend({
            defaults: function () {
                var props = component.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * A list of allowed html element selectors that this component
                     * can attach to
                     *
                     * @property allowedElements
                     * @type {String[]}
                     */
                    allowedElements: [
                        "input",
                        "textarea",
                        "select"
                    ]
                });

                return props;
            },
            /**
             * Render the input component
             *
             */
            render: function () {
                var data;

                this._checkIsValidElement();

                if (this.model) {
                    data = this.getModelData();
                }

                this.$el.val(data);

                component.prototype.render.call(this);
            }
        });
    });
