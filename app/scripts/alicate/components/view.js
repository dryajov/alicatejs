/**
 * Created by dmitriy.ryajov on 7/1/14.
 */

'use strict';

var Container = require('./container'),
    Markupiter = require('../markupiter'),
    $ = require('jquery');

/**
 * @module view
 */

/**
 * A class representing a view
 *
 * @class view.View
 * @extends container.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends view.View.prototype */{
    initialize: function initialize() {
        // this is needed to override components require id constraint
    },
    id: null,
    /**
     * @property {String} - The name of the template
     * that this view renders
     */
    templateName: '',
    /**
     * @property {String} - The string markup (unaltered)
     */
    template: '',
    /**
     * @property {jQuery} - An intermediary holder for
     * the current template
     */
    $template: null,
    /**
     * @property {boolean} - Flag indicating if this view is mounted
     */
    isMounted: false,
    /**
     * @property {Object} - Key/Value object holding the current route params
     */
    params: null,
    /**
     * Bind the component tree
     */
    bind: function bind() {
        var markupIter;

        if (this.isBound) {
            return;
        }

        if (!this.templateName ||
            (this.templateName && this.templateName.length < 1)) {
            throw new Error('argument templateName missing!');
        }

        if (!this.template ||
            (this.template && this.template.length < 1)) {
            throw new Error('argument template missing!');
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

            throw new Error(msg);
        }
    },
    /**
     * Render the component tree
     */
    render: function render() {
        this.$el ? this.$el.append(this.$template) : this.$el = this.$template;
        this.$template = null;

        this.cleanRendered();
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
