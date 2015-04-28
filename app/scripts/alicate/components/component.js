'use strict';

/**
 * @module component
 */

var Base = require('../base'),
    Eventable = require('../behaviors/eventable'),
    Model = require('../model'),
    RenderState = require('../enums/render'),
    $ = require('jquery'),
    _ = require('underscore');


/**
 * @callback component.Component~eventCallback
 * @param {Event} event
 */

/**
 * Component is the base building block of alicatejs.
 * By itself the component does not render anything, however
 * it controls the <em>visible</em> and <em>enabled</em> states of the html
 * element, as well as takes care of setting its <em>properties</em> and
 * <em>attributes</em>.
 *
 * @example
 * var myComponent = new Component({
 *  id: 'my-component',
 *  attributes: {
 *      class: 'some-class'
 *  }
 * }).on('click', function() {
 *      this.$el.text('I've been clicked!');
 * });
 *
 * @class component.Component
 * @extends base.Base
 * @version 1.0
 */
module.exports = Base.extend(/** @lends component.Component.prototype */{
    initialize: function initialize() {
        if (this.behaviors) {
            $.merge(this.defaultBehaviors, this.behaviors);
        }

        if (!this.id || (this.id && this.id.length < 1)) {
            throw new Error('Missing id!');
        }
    },
    instanceData: function instanceData() {
        return {
            /**
             * A list of default behaviors that this controller contains.
             * It makes sense to implement some core functionality as behaviors
             * that can be shared across many components. For example {@link eventable.Eventable}
             * is used to attach events to components, which is implemented as a behavior.
             * Also, all behaviors passed in as part of the behavior property during component
             * definition, will be merged with the behaviors defined here.
             *
             * @property {Behavior[]} - List of behaviors
             *
             * @memberof component.Component
             * @instance
             * @protected
             */
            defaultBehaviors: [],
            /**
             * A list of html elements that this component can attach to.
             * By default its null, which allows attaching to any element.
             *
             * @property {String[]} - Elements this component
             * can attach to
             *
             * @memberof component.Component
             * @instance
             */
            allowedElements: null,
            /**
             * A key/value pair of attributes for this component. This is
             * passed directly to jQuerie's attr method.
             *
             * @property {Object} - Map of attributes of this component
             *
             * @memberof component.Component
             * @instance
             */
            attributes: {},
            /**
             * A key/value pair of properties for this component. This is passed directly
             * to jQuerie's prop method.
             *
             * @property {Object} - Map of properties of this component
             *
             * @memberof component.Component
             * @instance
             */
            properties: {}
        }
    },
    /**
     * @property {String} - The id of the data element to attach to
     */
    id: '',
    /**
     * The jQuery wrapped dom element that this component controls
     *
     * @property {Object} - The html element reference that this
     * component is attached to
     **/
    $el: null,
    /**
     * The model for this component
     *
     * @property {Model}
     */
    model: null,
    /**
     * A list of user attached behaviors
     *
     * @property {Array}
     */
    behaviors: null,
    /**
     * Determines is the component is visible
     *
     * @property {Boolean}
     */
    visible: true,
    /**
     * The parent of this component
     *
     * @property {container}
     */
    parent: null,
    /**
     * Indicates if this component is bound to an html element
     *
     * @property {Boolean} - Is bound
     */
    isBound: false,
    /**
     * Enables/Disables the component. This sets the the <tt>disabled</tt>
     * attribute on the underlying html element.
     *
     * @property {Boolean} - Enable/Disable the component
     */
    enabled: true,
    /**
     * @property {Enum} - The current rendering state
     * @private
     */
    _renderState: RenderState.UNRENDERED,
    /**
     * A reference to the current alicatejs application
     *
     * @property {AlicateApp} - The current alicatejs app
     */
    app: null,
    /**
     * @property {Boolean} - Indicates if component has rendered
     * @private
     */
    hasRendered: false,
    /**
     * Controls the enabled/disabled state of the element
     *
     * @param {Boolean} enabled - Enable/Disable the element
     */
    setEnabled: function setEnabled(enabled) {
        this.enabled = this.enabled === enabled;
        this.render();
    },
    /**
     * Get an html attribute
     *
     * @param {String} attr - Attribute name
     * @param {String} val - Value
     */
    setAttr: function setAttr(attr, val) {
        this.attributes[attr] = val;
        return this;
    },
    /**
     * Set an html attribute
     *
     * @param {String} attr - Attribute name
     * @returns {Any}
     */
    getAttr: function getAttr(attr) {
        return this.attributes[attr];
    },
    /**
     * Get an html property
     *
     * @param {String} prop - Property name
     * @returns {*}
     */
    getProp: function getProp(prop) {
        return this.properties[prop];
    },
    /**
     * Set an html property
     *
     * @param {String} prop - Property name
     * @param {Any} val - Value
     * @returns {Any}
     */
    setProp: function setProp(prop, val) {
        return this.properties[prop];
    },
    /**
     * Callback called when the model has changed. It's
     * triggered right after the model has been updated with new data,
     * and this component has been rendered.
     *
     * @param newVal - the new val set on the model
     * @param oldVal - the old value the model held
     */
    onModelChanged: function onModelChanged(newVal, oldVal) {
    },
    /**
     * Bind an event handler to component for the specified event
     *
     * @param {Event} event - Event name
     * @param {eventCallback} callback - The callback for this event
     * @returns {this}
     */
    on: function on(event, callback) {
        this.addBehavior(new Eventable({
            event: event + '.' + this.id,
            handler: callback
        }));

        return this;
    },
    /**
     * Get the current rendered value of this component
     *
     * @return {String}
     */
    getValue: function getValue() {
        var value;

        if (this.$el.is("input, textarea, select, button")) {
            value = this.$el.val();
        } else {
            value = this.$el.text();
        }

        return value;
    },
    /**
     * Check if this is an element we can attach to
     *
     * @private
     */
    _checkIsValidElement: function _checkIsValidElement() {
        if (this.$el) {
            if (this.allowedElements && !this.$el.is(this.allowedElements.join(','))) {
                throw new Error('Component ' + this.id +
                ' is not allowed to attach to ' +
                this.$el.prop("tagName") + ' tag');
            }
        } else {
            if (!this.isBound) {
                throw new Error('Element ' + this.id + ' is not bound!');
            }
        }
    },
    /**
     * Return the compiled markup of this component
     *
     * @returns {Any}
     */
    getMarkup: function getMarkup() {
        return this.$el.html();
    },
    /**
     * Set component visibility
     *
     * @param {Boolean} visible - Set visible/hidden
     */
    setVisible: function setVisible(visible) {
        if (this.isVisible() != visible) {
            this.visible = visible;
            console.log("setting component id: " + this.id + " to visible: " + this.visible);
            this.render();
        }
    },
    /**
     * Is component visible
     *
     * @return {Boolean}
     */
    isVisible: function isVisible() {
        return this.visible;
    },
    /**
     * Attach behaviors
     *
     */
    bindBehaviors: function bindBehaviors() {
        if (!this.isBound) {
            return;
        }

        for (var behavior in this.defaultBehaviors) {
            if (!this.defaultBehaviors[behavior].attached) {
                this.defaultBehaviors[behavior].attach(this);
            }
        }
    },
    /**
     * Run attached behaviors
     * @private
     */
    runBehaviors: function runBehaviors() {
        if (!this.isBound) {
            return;
        }

        for (var behavior in this.defaultBehaviors) {
            if (!this.defaultBehaviors[behavior].attached) {
                switch (this._renderState) {
                    case RenderState.POST_RENDER:
                        this.defaultBehaviors[behavior].postRender(this);
                        break;
                    case RenderState.PRE_RENDER:
                        this.defaultBehaviors[behavior].preRender(this);
                        break;
                }
            }
        }
    },
    /**
     * Add a behavior to this component
     *
     * @param {Behavior} behavior - A behavior
     */
    addBehavior: function addBehavior(behavior) {
        this.defaultBehaviors.push(behavior);
        this.bindBehaviors();

        return this;
    },
    /**
     * Set the component model
     *
     * @param {Model} model - A model
     */
    setModel: function setModel(model) {
        this.model = model;
        this.bindModel();
    },
    /**
     * Get this component's model
     *
     * @returns {model.Model}
     */
    getModel: function getModel() {
        return this.model;
    },
    /**
     * Get this component model's data
     *
     * @returns {Any}
     */
    getModelData: function getModelData() {
        if (this.model instanceof Model) {
            return this.model.get();
        }

        return this.model;
    },
    /**
     * Hook called just before the component is rendered.
     *
     * Override this method to perform any action before the component is
     * rendered. For example, initiate loading of data.
     */
    onPreRender: function onPreRender() {
    },
    /**
     * Hook called just after the component is rendered.
     *
     * Override this method to perform any action after the component has been
     * rendered. For example, it is possible to trigger the update of other components
     * after this component has been rendered.
     */
    onPostRender: function onPostRender() {
    },
    /**
     * Called by {@link render}. Should be overridden by components to
     * provide they're render functionality.
     *
     * @protected
     * @return {Boolean} - Used to indicate if rendering succeeded
     */
    componentRender: function componentRender() {
        return true;
    },
    /**
     * Render the current element
     *
     * This method triggers the render of the component.
     * Rendering manipulates the dom element this component is attached to.
     * Usually, this would involve setting the visible and enabled states of the
     * component, as well as adjusting any attached attributes.
     */
    render: function render() {
        if (!this.isBound) {
            return false;
        }

        this._checkIsValidElement();

        this.bindBehaviors();

        if (this.$el) {
            this._renderState = RenderState.PRE_RENDER;
            this.onPreRender();

            // run behaviors before rendering
            this.runBehaviors();

            // call components render
            this.componentRender();

            for (var attr in this.attributes) {
                this.$el.attr(attr, this.attributes[attr]);
            }

            if (!this.isVisible()) {
                this.$el.css('display', 'none');
            } else {
                this.$el.css('display', '');
            }

            if (this.$el.prop('disabled') !== !this.enabled) {
                this.$el.prop('disabled', !this.enabled);
            }

            this.hasRendered = true;

            this._renderState = RenderState.POST_RENDER;
            this.onPostRender();

            // run behaviors after rendering
            this.runBehaviors();

            this._renderState = RenderState.RENDERED;
        }

        return true;
    },
    /**
     * Called when the component has been bound but not yet rendered
     */
    onComponentBound: function onComponentBound() {
    },
    /**
     * Scan the template and attach components to html elements
     */
    bind: function bind(markupIter) {
        this.isBound = true;
        this.onComponentBound();

        this.bindBehaviors();
    },
    /**
     * Bind the current model
     */
    bindModel: function bindModel() {
        var $el = this.$el,
            model = this.model,
            component = this,
            event = 'input.' + this.id,
            that = this;

        if (!$el || !this.model) {
            return;
        }

        if (this.model instanceof Model) {
            $el.off(event);
            $el.on(event, function (e) {
                model.set(that.getValue());
            });

            model.subscribe(function (newVal, oldVal) {
                if (!_.isEqual(newVal, oldVal)) {
                    component.hasRendered = false;
                    component.render();
                    component.onModelChanged(newVal, oldVal);
                }
            });
        }
    }
});
