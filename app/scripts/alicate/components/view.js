/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
var Container = require('alicate/components/container'),
    Markupiter = require('alicate/markupiter');

exports.View = function () {
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
        initialize: function initialize() {
            // this is needed to override components require id constraint
        },
        id: null,
        /**
         * @property {String} template - The name of the template
         * that this view renders
         */
        templateName: '',
        /**
         * @property {String} template - The string markup (unaltered)
         */
        template: '',
        /**
         * @property {jQuery} $template - An intermediary holder for
         * the current template
         */
        $template: null,
        /**
         * @property {boolean} - Flag indicating if this view is mounted
         */
        isMounted: false,
        /**
         * Bind the component tree
         */
        bind: function bind() {
            var markupIter;

            if (!this.templateName ||
                (this.templateName && this.templateName.length < 1)) {
                throw 'argument templateName missing!';
            }

            if (!this.template ||
                (this.template && this.template.length < 1)) {
                throw 'argument template missing!';
            }

            this.$template = $('<div/>').append(this.template);
            markupIter = Markupiter.createMarkupIter(this.$template[0]);
            Container.prototype.bind.call(this, markupIter);

            if (markupIter.nextNode()) {
                var msg = "Not all elements where bound!\n" +
                    "Missed elements are:\n";
                do {
                    msg += $(markupIter.currentNode).data().aid + "\n" +
                    "in template: " + this.templateName + "\n";
                } while (markupIter.nextNode());

                throw msg;
            }
        },
        /**
         * Render the component tree
         */
        render: function render() {
            this.$el ? this.$el.append(this.$template) : this.$el = this.$template;
            this.$template = null;

            Container.prototype.render.call(this);
            return this.$el;
        },
        _updateVisiblity: function _updateVisiblity() {
            if (!this.isMounted) {
                Container.prototype._updateVisiblity.call(this);
            }

            return;
        }
    });
};
