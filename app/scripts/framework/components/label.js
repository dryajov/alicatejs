define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        return component.extend({
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
                // TODO: Verify that we're rendering into a
                // valid element
                var data;

                if (this.model) {
                    data = this.model.getData();
                }

                this.$el.text(this._interpolate(this.text, data));

                return this.$el;
            },
            _interpolate: function (text, model) {
                return text.replace(/{([^{}]*)}/g,
                    function (a, b) {
                        var r = model[b];
                        return typeof r === 'string' || typeof r === 'number' ? r : a;
                    }
                );
            }
        });
    });
