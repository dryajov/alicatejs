/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
'use strict';

var Component = require('./component');

/**
 * @module input
 */

/**
 * The input class allows capturing data from an html element.
 *
 * @example
 *
 * var someInput;
 * var inputModel = new Model({data: someInput});
 * var myInput = new Input({
 *      id: 'my-input',
 *      model: inputModel
 * });
 *
 * var myLabel = new Label({
 *      id: 'my-label',
 *      model: inputModel
 * });
 *
 * @class input.Input
 * @extends Component
 * @version 1.0
 */

module.exports = Component.extend(/** @lends input.Input.prototype */{
    instanceData: function instanceData() {
        return {
            /**
             * @property {String[]} - Elements
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
