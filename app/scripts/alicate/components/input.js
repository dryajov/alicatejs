/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'alicate/components/component'
    ],
    function makeInput(Component) {
        'use strict';

        /**
         * A module representing an input
         *
         * @exports alicate/components/input
         * @version 1.0
         */
        return Component.extend({
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
                        "input",
                        "textarea",
                        "select"
                    ]
                });

                return props;
            },
            /**
             * Get the value of this html element
             *
             * @returns {*}
             */
            getValue: function () {
                return this.$el.val();
            },
            /**
             * Render the input component
             *
             */
            render: function () {
                var data;

                this._checkIsValidElement();

                if (this.model) {
                    data = this.getModelData();
                }

                this.$el.val(data);

                Component.prototype.render.call(this);
            }
        });
    });
