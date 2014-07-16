/**
 * Created by dmitriy.ryajov on 7/15/14.
 */

/**
 * A module representing a button
 *
 * @module button
 */
define(
    [
        'alicate/components/label',
        'alicate/behaviors/eventable'
    ],
    function makeLabel(label, eventable) {
        'use strict';

        /**
         * A module representing a button
         *
         * @exports alicate/components/button
         * @version 1.0
         */
        return label.extend({
            initialize: function() {
                this.defaultBehaviors.push(new eventable({
                    event: 'click',
                    handler: this.onClick
                }));

                label.prototype.initialize.call(this);
            },
            defaults: function () {
                var props = label.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * A list of allowed html element selectors that this component
                     * can attach to
                     *
                     * @property allowedElements
                     * @type {String[]}
                     */
                    allowedElements: [
                        "button",
                        "input"
                    ],
                    defaultBehaviors: []
                });

                return props;
            },
            /**
             * The text to be rendered
             *
             * @property text
             * @type {String}
             */
            text: '',
            /**
             * Default event handler for this button
             *
             */
            onClick: function () {

            },
            /**
             * Render the text into the attached html element
             *
             * @return {Object}  this object
             */
            render: function () {
                var data = this.getModelData(),
                    text = data ? this.interpolate(this.text, data) : this.text,
                    name = this.$el.prop('tagName').toLowerCase();

                this._checkIsValidElement();

                switch (name) {
                    case "button":
                        this.$el.text(text);
                        break;
                    case "input":
                        this.$el.attr('value', text);
                }
            }
        });
    });

