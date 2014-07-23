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
         * A module representing a view
         *
         * @module View
         * @exports alicate/components/view
         * @extends Container
         * @version 1.0
         */
        return Container.extend({
            initialize: function () {
                if (this.templateName.length < 1) {
                    throw 'templateName missing!';
                }
            },
            id: null,
            /**
             * @property {String} template - The name of the template that this view renders
             */
            templateName: '',
            /**
             * @property {String} template - The string markup (unaltered)
             */
            template: '',
            bind: function () {
                this.$el = $('<div/>').append(this.template);
                Container.prototype.bind.call(this,
                    Markupiter.createMarkupIter(this.$el[0]));

            },
            /**
             * @method render - Render the component tree
             */
            render: function () {
                Container.prototype.render.call(this);
            }
        });
    });
