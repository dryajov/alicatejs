/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
var Component = require('alicate/components/component');

exports.input = function () {
    'use strict';

    /**
     * A module representing an input
     *
     * @module Input
     * @exports alicate/components/input
     * @version 1.0
     */
    return Component.extend({
        instanceData: function instanceData() {
            return {
                /**
                 * @property {String[]} allowedElements - Elements
                 * this component can attach to
                 */
                allowedElements: [
                    "input",
                    "textarea"
                ]
            };
        },
        /**
         * Get the value of this html element
         *
         * @returns {*}
         */
        getValue: function getValue() {
            return this.$el.val();
        },
        /**
         * Render the input component
         *
         */
        render: function render() {
            var data;

            this._checkIsValidElement();

            if (this.model) {
                data = this.getModelData();
                this.$el.val(data);
            }
            Component.prototype.render.call(this);
        }
    });
};
