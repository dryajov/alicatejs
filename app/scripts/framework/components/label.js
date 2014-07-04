define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        function interpolate (text, model) {
            return text.replace(/{([^{}]*)}/g,
                function (a, b) {
                    var r = model[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        }

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
                var data = '';

                if (!this.$el.is("div, p, span")) {
                    throw 'Invalid element!';
                }

                if (this.model) {
                    data = this.model.get();
                }

                this.$el.html(data ? interpolate(this.text, data) : this.text);
            }
        });
    });
