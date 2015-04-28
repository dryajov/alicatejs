/**
 * Created by dmitriy.ryajov on 7/17/14.
 */

/**
 * @module image
 */

'use strict';

var Component = require('./component');

/**
 * An <tt>Image</tt> class
 *
 * @example
 * var myImage = new Image({
 *      id: 'my-image',
 *      src: 'https://raw.githubusercontent.com/dryajov/alicatejs/master/logo.jpg'
 * })
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
