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
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            _process: function () {
                this.$el = $('<div/>').append(this.template);
                this.bind(markupiter.createMarkupIter(this.$el[0]));
            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function () {
                this._process();
                container.prototype.render.call(this);
            }
        });
    });
