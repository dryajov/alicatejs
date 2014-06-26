define(
'framework/components/label',
[
    'framework/component'
],
function(component){
    'use strict';

    return component.extend({
        /**
         * The text to be rendered
         *
         * @property
         * @type {String}
         */
        text: '',
        /**
         * Render the text into the attached html element
         *
         * @return {Object}  this object
         */
        render: function() {
            // TODO: Verify that we're rendering into a
            // valid element
            this.$el.text(this.text);
        }
    });
});
