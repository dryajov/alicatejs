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
 * A View is just like a {@link container.Container|Container}
 * except that it knows how to initiate parsing of its associated
 * markup element. Use the view as an entry point to a section of
 * your application. Views are usually mounted on locations when the
 * {@link alicateapp.AlicateApp|AlicateApp} is being defined.
 *
 * @example
 * new View({
 *      templateName: 'app/scripts/hello-world/hello-world.html',
 *      children: [
 *          new Label({
 *              id: 'hello',
 *              text: 'Hello World from Alicate!!'
 *          })
 *      ]
 *  });
 *
 * @class view.View
 * @extends container.Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends view.View.prototype */{
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
     * The location this view has been called with
     *
     * @property {String}
     */
    path: null,
    /**
     * Request context
     *
     * @property {Object} - The request context for this request.
     * Currently the context as passed by pagejs, see pagejs docs for more info
     */
    ctx: null,
    /**
     * Causes the container markup to be skipped
     * from the output
     */
    skipContainerMarkup: false,
    /**
     * Override to prevent throwing on missing id (for views, id is optional)
     *
     * @private
     * @returns {boolean}
     */
    isIdValid: function isIdValid() {
        return true;
    },
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
                if (this.skipContainerMarkup) {
                    this.$el.replaceWith(this.$template.children());
                } else {
                    this.$el.append(this.$template.children());
                }
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
