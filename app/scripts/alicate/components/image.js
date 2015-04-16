/**
 * Created by dmitriy.ryajov on 7/17/14.
 */

'use strict';

var Component = require('./component');

/**
 * @module image
 */

/**
 * A class representing a button
 *
 * @class image.Image
 * @extends component.Component
 * @version 1.0
 */
module.exports = Component.extend(/** @lends image.Image.prototype */{
    instanceData: function instanceData() {
        return {
            /**
             * A list of allowed html element selectors that this component
             * can attach to
             *
             * @property allowedElements
             * @type {String[]}
             *
             *
             * @memberof image.Image
             * @instance
             */
            allowedElements: [
                "img"
            ]
        };
    },
    /**
     * The source of the image
     *
     * @property text
     * @type {String}
     */
    src: '',
    /**
     * Set src attribute
     *
     * @param src
     */
    setSrc: function setSrc(src) {
        this.src = src;
        this.render();
    },
    /**
     * Render the text into the attached html element
     *
     * @return {Boolean}  this object
     */
    componentRender: function componentRender() {
        if (!Component.prototype.componentRender.call(this)) {
            return false;
        }

        this.$el.attr('src', this.src);
    }
});
