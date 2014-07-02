/**
 * @class view
 *
 * Defines a view that renders components and other views
 */
define(
    'framework/view',
    [
        'framework/components/container'
    ],
    function (container) {
        'use strict';

        return container.extend({
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
             * The template markup from the template store
             *
             * @type {jQuery}
             */
            $_templateMarkup: null,
            /**
             * Scan the template and attach componnents to html elements
             *
             * @return {void}
             */
            _process: function () {
                this.$_templateMarkup = $('<div/>').append(this.template);
                this.process(this.$_templateMarkup);
            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function () {
                var component;

                this._process();

                // run through the list of components and render them
                for (var key in this._components) {
                    component = this._components[key];

                    if (this._components.hasOwnProperty(key)) {
                        component.render();
                        component.attachBehaviors();
                    }
                }

                return this.$_templateMarkup;
            }
        });
    });
