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
            template: ''
        });
    });
