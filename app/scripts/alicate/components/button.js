/**
 * Created by dmitriy.ryajov on 7/15/14.
 */

'use strict';

var Label = require('./label');

/**
 * @module button
 */

/**
 * A class representing a button
 *
 * @class button.Button
 * @extends label.Label
 * @version 1.0
 */
module.exports = Label.extend(/** @lends Button.prototype */ {
    instanceData: function instanceData() {
        return {
            /**
             * @property {String[]} allowedElements - Elements this
             * component can attach to
             *
             * @memberof button.Button
             * @instance
             */
            allowedElements: [
                'button',
                'input'
            ],
            /**
             * @property {String} - The selected state css class of the button
             *
             * @memberof button.Button
             * @instance
             *
             */
            selectedClass: null,
            /**
             * @property {Boolean} - Toggle On/Off
             *
             * @memberof button.Button
             * @instance
             */
            selected: false
        };
    },
    /**
     *
     * @param checked
     */
    toggle: function toggle() {
        this.selected = !this.selected;
        this.render();
    },
    /**
     * Render the text into the attached html element
     *
     * @return {Boolean} - this object
     */
    componentRender: function render() {
        if (!Label.prototype.componentRender.call(this)) {
            return false;
        }

        if (this.$el.is('[type=checkbox]')) {
            this.$el.prop('checked', this.selected);
        } else if (this.$el.is('[type=radio]')) {
            this.$el.prop('selected', this.selected);
        }

        if (this.selectedClass) {
            this.$el.toggleClass(this.selectedClass, this.selected);
        }

        return true;
    }
});

