/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
'use strict';

var Component = require('./component');

/**
 * A module representing an input
 *
 * @class Input
 * @version 1.0
 */

module.exports = Component.extend(/** @lends Input.prototype */{
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
        if (!Component.prototype.render.call(this)) {
            return false;
        }

        var data;

        if (this.model) {
            data = this.getModelData();
            this.$el.val(data);
        }

        return true;
    }
});
