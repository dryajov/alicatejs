/**
 * Created by dmitriy.ryajov on 7/17/14.
 */
var Component = require('alicate/components/component');

exports.label = function makeLabel(Component) {
    'use strict';

    /**
     * A module representing a button
     *
     * @module Image
     * @exports alicate/components/image
     * @version 1.0
     */
    return Component.extend({
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
                ]
            };
        },
        /**
         * The text to be rendered
         *
         * @property text
         * @type {String}
         */
        src: '',
        /**
         * Render the text into the attached html element
         *
         * @return {this}  this object
         */
        render: function render() {
            this._checkIsValidElement();

            this.$el.attr('src', this.src);
            Component.prototype.render.call(this);
        }
    });
};
