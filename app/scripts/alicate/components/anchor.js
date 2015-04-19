/**
 * Created by dmitriy.ryajov on 4/11/15.
 */

'use strict';

var Container = require('./container');

/**
 * @module anchor
 */

/**
 * An anchor class
 *
 * @example
 * var myAnchor = new Anchor({
 *  id: 'my-anchor',
 *  href: 'http://alicatejs.org'
 * });
 *
 * // change the link to something else
 * myAnchor.setHref('http://github.com/dryajov/alicatejs');
 *
 * @class anchor.Anchor
 * @extends container.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends anchor.Anchor.prototype */{
    instanceData: function instanceData() {
        return {
            /**
             * A list of allowed html element selectors that this component
             * can attach to
             *
             * @property
             * @type {String[]}
             *
             * @memberof anchor.Anchor
             * @instance
             */
            allowedElements: [
                "a"
            ]
        };
    },
    /**
     * The href of the anchor
     *
     * @property
     * @type {String}
     */
    href: '',
    /**
     * Set the href attribute
     *
     * @param href {String}
     */
    setHref: function setHref(href) {
        this.href = href;
        this.render();
    },
    /**
     * Render the href into the attached anchor tag
     *
     * @return {Boolean}
     */
    componentRender: function render() {
        if (!Container.prototype.componentRender.call(this)) {
            return false;
        }

        this.$el.attr('href', this.href);
    }
});
