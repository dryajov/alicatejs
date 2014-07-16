/**
 * A module representing a view
 *
 * @module view
 */
define(
    [
        'alicate/components/container',
        'alicate/markupiter'
    ],
    function makeView(container, markupiter) {
        'use strict';

        /**
         * A module representing a repeater
         *
         * @exports alicate/components/view
         * @version 1.0
         */
        return container.extend({
            initialize: function() {
                if (this.templateName.length < 1) {
                    throw 'templateName missing!';
                }
            },
            id: 'view',
            /**
             * The name of the template that this view renders
             *
             * @property template
             * @type {String}
             */
            templateName: '',
            /**
             * The string markup (unaltered)
             *
             * @property template
             * @type {String}
             */
            template: '',
            bind: function() {
                this.$el = $('<div/>').append(this.template);
                container.prototype.bind.call(this, markupiter.createMarkupIter(this.$el[0]));

            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function () {
                container.prototype.render.call(this);
            }
        });
    });
