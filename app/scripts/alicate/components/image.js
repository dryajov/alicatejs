/**
 * Created by dmitriy.ryajov on 7/17/14.
 */

'use strict';

var Component = require('./component');


/**
 * A module representing a button
 *
 * @module Image
 * @exports alicate/components/image
 * @version 1.0
 */
module.exports = Component.extend({
    initialize: function initialize() {
        if (!this.src.length) {
            throw 'src is missing!';
        }
    },
    instanceData: function instanceData() {
        return {
            /**
             * A list of allowed html element selectors that this component
             * can attach to
             *
             * @property allowedElements
             * @type {String[]}
             */
            allowedElements: [
                "img"
            ],
            /**
             * The text to be rendered
             *
             * @property text
             * @type {String}
             */
            src: ''
        };
    },
    /**
     * Render the text into the attached html element
     *
     * @return {Boolean}  this object
     */
    render: function render() {
        if (!Component.prototype.render.call(this)) {
            return false;
        }

        this.$el.attr('src', this.src);
    }
});
