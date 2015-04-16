/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
'use strict';

var Component = require('./component');

/**
 * @module input
 */

/**
 * A class representing an input
 *
 * @class input.Input
 * @extends Component
 * @version 1.0
 */

module.exports = Component.extend(/** @lends input.Input.prototype */{
    instanceData: function instanceData() {
        return {
            /**
             * @property {String[]} allowedElements - Elements
             * this component can attach to
             *
             * @memberof input.Input
             * @instance
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
    componentRender: function componentRender() {
        if (!Component.prototype.componentRender.call(this)) {
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
