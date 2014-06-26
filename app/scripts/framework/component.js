/**
 * This is an abstract base class for components to inherit from
 */
define(
'framework/component',
[
	'framework/base'
],
function(base) {
	'use strict';

	return base.extend({
	    /**
	     * The id of the element to attach to
	     *
	     * @property id
	     */
		id: '',
	    /**
	     * Render the current element
	     *
	     * @method render
	     *
	     */
	    render     : function($el) {
	        throw 'Method unimplemented!';
	    },
		/**
		 * The html element reference that this component is attached to
		 *
		 * @property
		 * @type {object}
		 *
		**/
		$el: null,
	    /**
	     * The model for this component
	     *
	     * @property _model
	     */
	    model     : null
	});
});
