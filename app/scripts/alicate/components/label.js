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
         * @module Label
         * @exports alicate/components/label
         * @version 1.0
         */
        return Component.extend({
            defaults: function defaults() {
                var props = Component.prototype.defaults.call(this);

                $.extend(props, {
                    /**
                     * @property {String[]} allowedElements - Elements this
                     * component can attach to
                     */
                    allowedElements: [
                        "div",
                        "span",
                        "p",
                        "a",
                        "option",
                        "label"
                    ]
                });

                return props;
            },
            /**
             * The text supports simplistic value interpolation
             * of the form of {myStringVal}, where the value in curly
             * braces will be replaced by a matching property in the
             * model.
             *
             * @property {String} text - The text to be rendered.
             *
             * @example
             * 'The {value} in curly braces will be replaced with the
             * value of a matching property returned by the model'
             */
            text: '',
            /**
             * Render the text into the attached html element
             *
             * @return {Object} this object
             */
            render: function render() {
                var data = this.getModelData();

                this._checkIsValidElement();

                this.$el.html(data ? this.interpolate(this.text, data) : this.text);

                Component.prototype.render.call(this);
            },
            /**
             * TODO: This needs to be moved to utility class
             *
             * Interpolate simple templates of the form {val}
             *
             * @param {String} text - The text to be interpolated
             * @param {Object} model - An object where the prop to
             * be interpolated is looked up
             * @returns {*|XML|string|void|Context}
             */
            interpolate: function interpolate(text, model) {
                return text.replace(/{([^{}]*)}/g,
                    function (a, b) {
                        var r = model[b];
                        return typeof r === 'string' || typeof r === 'number' ? r : a;
                    }
                );
            }
        });
    });
