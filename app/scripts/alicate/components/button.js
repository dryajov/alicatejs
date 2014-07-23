/**
 * Created by dmitriy.ryajov on 7/15/14.
 */

define(
    [
        'alicate/components/label',
        'alicate/components/component'
    ],
    function makeLabel(Label, Component) {
        'use strict';

        /**
         * A module representing a button
         *
         * @module Button
         * @exports alicate/components/button
         * @version 1.0
         */
        return Label.extend({
            defaults: function () {
                var props = Label.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * @property {String[]} allowedElements - Elements this component can attach to
                     */
                    allowedElements: [
                        "button",
                        "input"
                    ]
                });

                return props;
            },
            /**
             * @property {Boolean} - Should the component be enabled/disabled
             *
             */
            enabled: true,
            /**
             * @param {Boolean} enabled - Enable/Disable this element
             */
            setEnabled: function (enabled) {
                if (this.enabled !== enabled) {
                    this.enabled = enabled;
                    this.render();
                }
            },
            /**
             * Render the text into the attached html element
             *
             * @return {Object} - this object
             */
            render: function () {
                var data = this.getModelData(),
                    text = data ? this.interpolate(this.text, data) : this.text,
                    name = this.$el.prop('tagName').toLowerCase();

                this._checkIsValidElement();

                switch (name) {
                    case "button":
                        this.$el.text(text);
                        break;
                    case "input":
                        this.$el.attr('value', text);
                }

                this.$el.prop('disabled', !this.enabled);
                Component.prototype.render.call(this);
            }
        });
    });

