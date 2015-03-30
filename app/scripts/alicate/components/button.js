/**
 * Created by dmitriy.ryajov on 7/15/14.
 */

'use strict';

var Label = require('./label'),
    Component = require('./component');

/**
 * A module representing a button
 *
 * @module Toggle
 * @exports alicate/components/button
 * @version 1.0
 */
module.exports = Label.extend({
    instanceData: function instanceData() {
        return {
            /**
             * @property {String[]} allowedElements - Elements this
             * component can attach to
             */
            allowedElements: [
                "button",
                "input"
            ],
            /**
             * @property {String} - The selected state css class of the button
             */
            selectedClass: null,
            /**
             * @property {Boolean} - Toggle On/Off
             */
            checked: false
        };
    },
    /**
     *
     * @param checked
     */
    toggle: function toggle() {
        this.checked = !this.checked;
        this.render();
    },
    /**
     * Render the text into the attached html element
     *
     * @return {Boolean} - this object
     */
    render: function render() {
        if (!Label.prototype.render.call(this)) {
            return false;
        }

        if (this.$el.is(':checkbox')) {
            this.$el.prop('checked', this.checked);
        } else if (this.$el.is(':radio')) {
            this.$el.prop('selected', this.checked);
        }

        if (this.selectedClass) {
            this.$el.toggleClass(this.selectedClass, this.checked);
        }

        return true;
    }
});

