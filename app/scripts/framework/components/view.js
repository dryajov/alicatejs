/**
 * A module representing a view
 *
 * @module view
 */
define(
    [
        'framework/components/container'
    ],
    function (container) {
        'use strict';

        var DATA_ATTR = '[data-eid]';

        /**
         * A module representing a repeater
         * @exports framework/components/view
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
                this.$_templateMarkup = $('<div/>').append(this.template);
                this.bind(document.createTreeWalker(this.$_templateMarkup[0], NodeFilter.SHOW_ELEMENT, {
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
