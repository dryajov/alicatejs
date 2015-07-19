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
     * @property {Object} - Key/Value object holding the current route params
     */
    params: null,
    /**
     * The location this view has been called with
     *
     * @property {String}
     */
    path: null,
    /**
     * Bind the component tree
     */
    bind: function bind() {
        var markupIter,
            msg;

        if (this.isBound) {
            return;
        }

        if (!this.templateName ||
            (this.templateName && this.templateName.length < 1)) {
            throw new Error('argument templateName missing!');
        }

        if (!this.template) {
            if (this.app.templateStore[this.templateName]) {
                this.template = this.app.templateStore[this.templateName];
            } else {
                msg = this.id ?
                'argument template missing for view id: ' + this.id + '!' :
                    'argument template missing!';
                throw new Error(msg);
            }
        }

        this.$template = $('<div/>').append(this.template);
        markupIter = Markupiter.createMarkupIter(this.$template[0]);
        Container.prototype.bind.call(this, markupIter);

        if (markupIter.nextNode()) {
            msg = 'Not all elements where bound!\n' +
            'Missed elements are:\n';
            do {
                msg += '\'' + $(markupIter.currentNode).data().aid +
                ' in template: ' + this.templateName + '\n';
            } while (markupIter.nextNode());

            throw new Error(msg);
        }
    },
    /**
     * Render the component tree
     */
    render: function render() {
        this.app.injector.inject(this);

        if (this.$template) {
            //this.$el ? this.$el.append(this.$template.children())
            //    : this.$el = this.$template.children();

            if (this.$el !== null) {
                this.$el.append(this.$template.children());
            } else {
                this.$el = this.$template.children();
            }

            this.$template = null;
        }

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
