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
    function makeInput(component) {
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
             * Should the component be enabled/disabled
             *
             */
            enabled: true,
            /**
             * Enable/Disable the element
             * @param {Boolean} enabled
             */
            setEnabled: function(enabled) {
                if (this.enabled !== enabled) {
                    this.enabled = enabled;
                    this.render();
                }
            },
            /**
             * Get the value of this html element
             *
             * @returns {*}
             */
            getValue: function () {
                return this.$el.val();
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
                this.$el.prop('disabled', !this.enabled);
            }
        });
    });
