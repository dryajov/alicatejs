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
            instanceData: function instanceData() {
                return {
                    /**
                     * @property {String[]} allowedElements - Elements this
                     * component can attach to
                     */
                    allowedElements: [
                        "button",
                        "input"
                    ]
                };
            },
            /**
             * @property {Boolean} - Should the component be enabled/disabled
             *
             */
            enabled: true,
            /**
             * @param {Boolean} enabled - Enable/Disable this element
             */
            setEnabled: function setEnabled(enabled) {
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
            render: function render() {
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

