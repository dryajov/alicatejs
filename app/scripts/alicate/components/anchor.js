/**
 * Created by dmitriy.ryajov on 4/11/15.
 */
/**
 * Created by dmitriy.ryajov on 7/17/14.
 */

'use strict';

var Container = require('./container');

/**
 * A class representing a button
 *
 * @class Anchor
 * @extends Component
 * @version 1.0
 */
module.exports = Container.extend(/** @lends Anchor.prototype */{
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
                "a"
            ]
        };
    },
    /**
     * The href of the anchor
     *
     * @property text
     * @type {String}
     */
    href: '',
    /**
     * Set the href attribute
     *
     * @param href
     */
    setHref: function setHref(href) {
        this.href = href;
        this.render();
    },
    /**
     * Render the text into the attached html element
     *
     * @return {Boolean}  this object
     */
    componentRender: function render() {
        if (!Container.prototype.componentRender.call(this)) {
            return false;
        }

        this.$el.attr('href', this.href);
    }
});
