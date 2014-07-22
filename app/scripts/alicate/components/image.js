/**
 * Created by dmitriy.ryajov on 7/17/14.
 */
define(
    [
        'alicate/components/component'
    ],
    function makeLabel(Component) {
        'use strict';

        /**
         * A module representing a button
         *
         * @exports alicate/components/image
         * @version 1.0
         */
        return Component.extend({
            initialize: function () {
                if (!this.src.length) {
                    throw 'src is missing!';
                }
            },
            defaults: function () {
                var props = Component.prototype.defaults.call(this);

                $.extend(props, {
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
                });

                return props;
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
             * @return {Object}  this object
             */
            render: function () {
                this._checkIsValidElement();

                this.$el.attr('src', this.src);
                Component.prototype.render.call(this);
            }
        });
    });