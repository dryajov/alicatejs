/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'alicate/components/component'
    ],
    function makeLabel(Component) {
        'use strict';

        /**
         * A module representing a label
         *
         * @exports alicate/components/label
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
                        "div",
                        "span",
                        "p",
                        "a",
                        "option"
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
            text: '',
            /**
             * Render the text into the attached html element
             *
             * @return {Object}  this object
             */
            render: function () {
                var data = this.getModelData();

                this._checkIsValidElement();

                this.$el.html(data ? this.interpolate(this.text, data) : this.text);

                Component.prototype.render.call(this);
            },
            /**
             * Interpolate simple templates of the form {val}
             *
             * @param text
             * @param model
             * @returns {*|XML|string|void|Context}
             */
            interpolate: function (text, model) {
                return text.replace(/{([^{}]*)}/g,
                    function (a, b) {
                        var r = model[b];
                        return typeof r === 'string' || typeof r === 'number' ? r : a;
                    }
                );
            }
        });
    });
