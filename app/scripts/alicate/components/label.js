/**
 * Created by dmitriy.ryajov on 7/1/14.
 */

'use strict';

var Component = require('./component');

/**
 * @module label
 */

/**
 * Label displays the contents of its text property or if that is not set.
 *
 * @example
 *  new Label({
 *      id: 'hello',
 *      text: 'Hello World from Alicate!!'
 * });
 *
 * @class label.Label
 * @extends component.Component
 * @version 1.0
 */
module.exports = Component.extend(/** @lends label.Label.prototype */{
  instanceData: function instanceData() {
    return {
      /**
       * @property {String[]} - Elements this
       * component can attach to
       *
       * @memberof label.Label
       * @instance
       */
      allowedElements: [
        'div',
        'span',
        'p',
        'a',
        'option',
        'label',
        'small',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'i'
      ]
    };
  },
  /**
   * The text supports simplistic value interpolation
   * of the form of {myStringVal}, where the value in curly
   * braces will be replaced by a matching property in the
   * model.
   *
   * @property {String} - The text to be rendered.
   *
   * @example
   * 'The {value} in curly braces will be replaced with the
   * value of a matching property returned by the model'
   */
  text: '',
  /**
   * Render the text into the attached html element
   *
   * @return {Object} this object
   */
  componentRender: function componentRender() {
    if (!Component.prototype.componentRender.call(this)) {
      return false;
    }

    var text = '', data = this.getModelData();
    if ((this.text.length > 0) && typeof data === 'object') {
      text = this.interpolate(this.text, data);
    } else if (this.text.length > 0) {
      text = this.text;
    } else if (typeof data === 'string' || typeof data === 'number') {
      text = data;
    }

    if (this.$el.is('input, textarea, select')) {
      this.$el.val(text);
    } else {
      this.$el.text(text);
    }

    return true;
  },
  /**
   * TODO: This needs to be moved to utility class
   *
   * Interpolate simple templates of the form {val}
   *
   * @param {String} text - The text to be interpolated
   * @param {Object} model - An object where the prop to
   * be interpolated is looked up
   * @returns {*|XML|string|void|Context}
   */
  interpolate: function interpolate(text, model) {
    return text.replace(/{([^{}]*)}/g,
      function (a, b) {
        var r = model[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      }
    );
  }
});
