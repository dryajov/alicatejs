define(
    [
        'framework/components/container'
    ],
    function (container) {
        'use strict';

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
                this.bind(this.$_templateMarkup);
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
