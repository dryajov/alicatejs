/**
 * A module representing a view
 *
 * @module view
 */
define(
    [
        'alicate/components/container'
    ],
    function makeView(container) {
        'use strict';

        /**
         * A module representing a repeater
         *
         * @exports alicate/components/view
         * @version 1.0
         */
        return container.extend({
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
                this.bind(document.createTreeWalker(this.$el[0], NodeFilter.SHOW_ELEMENT, {
                    acceptNode: function (node) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }, false));
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
