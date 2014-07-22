/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'alicate/components/container',
        'alicate/markupiter'
    ],
    function makeView(Container, Markupiter) {
        'use strict';

        /**
         * A module representing a repeater
         *
         * @exports alicate/components/view
         * @version 1.0
         */
        return Container.extend({
            initialize: function () {
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
            bind: function () {
                this.$el = $('<div/>').append(this.template);
                Container.prototype.bind.call(this,
                    Markupiter.createMarkupIter(this.$el[0]));

            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function () {
                Container.prototype.render.call(this);
            }
        });
    });
