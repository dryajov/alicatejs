'use strict';

var Base = require('../base'),
    Eventable = require('../behaviors/eventable'),
    Model = require('../model'),
    RenderState = require('../enums/render'),
    _ = require('underscore'),
    $ = require('jquery');


/**
 * A module representing a component
 *
 * @class Component
 * @extends Base
 * @version 1.0
 */
module.exports = Base.extend(/** @lends Component.prototype */{
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
             * @property {Behavior[]} defaultBehaviors - A list of default
             * behaviors of the component
             */
            defaultBehaviors: [],
            /**
             * @property {String[]} allowedElements - Elements this component
             * can attach to
             */
            allowedElements: null,
            /**
             * @property {Object} attributes - Map of attributes of this component
             */
            attributes: {},
            /**
             * @property {Object} property - Map of properties of this component
             */
            properties: {}
        }
    },
    /**
     * @property {String} id - The id of the data element to attach to
     */
    id: '',
    /**
     * @property {Object} $el - The html element reference that this
     * component is attached to
     **/
    $el: null,
    /**
     * @property model - The model for this component
     */
    model: null,
    /**
     * @property {Array} behaviors - A list of user attached behaviors
     * associated with this component
     */
    behaviors: null,
    /**
     * @property {Boolean} visible - Determines is the component is visible
     */
    visible: true,
    /**
     * @property {container} parent - The parent of this component
     */
    parent: null,
    /**
     * @property {Boolean} isBound - Is component bout
     */
    isBound: false,
    /**
     * @property {Boolean} - Should the component be enabled/disabled
     */
    enabled: true,
    /**
     * @property {Enum} - The current rendering state
     */
    _renderState: RenderState.UNRENDERED,
    /**
     * @param {Boolean} enabled - Enable/Disable the element
     */
    setEnabled: function setEnabled(enabled) {
        this.enabled = this.enabled === enabled;
        this.render();
    },
    /**
     * Get html attribute
     *
     * @param {String} attr - Attribute name
     * @param {String} val - Value
     */
    setAttr: function setAttr(attr, val) {
        this.attributes[attr] = val;
        return this;
    },
    /**
     * Set html attribute
     *
     * @param {String} attr - Attribute name
     * @returns {Any}
     */
    getAttr: function getAttr(attr) {
        return this.attributes[attr];
    },
    /**
     * Get html property
     *
     * @param {String} prop - Property name
     * @returns {*}
     */
    getProp: function getProp(prop) {
        return this.properties[prop];
    },
    /**
     * Set html property
     *
     * @param {String} prop - Property name
     * @param {Any} val - Value
     * @returns {Any}
     */
    setProp: function setProp(prop, val) {
        return this.properties[prop];
    },
    /**
     * @property {Boolean} hasRendered - flag signaling if the model has
     * changed since the last time the model got updated
     */
    hasRendered: false,
    /**
     * Callback called when the model has changed. It's
     * triggered right before the data is being set on the
     * model.
     *
     * @param newVal - the new val set on the model
     * @param oldVal - the old value the model held
     */
    onModelChanged: function onModelChanged(newVal, oldVal) {
    },
    /**
     * Bind event handler to component for the specified event
     *
     * @param {Event} event - Event name
     * @param callback - Callback
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
     * Performs a check if this is an element we can attach to
     *
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
     * Attache the behaviors
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
     * Add a behavior to the component
     *
     * @param {Behavior} behavior - The behavior to be added
     */
    addBehavior: function addBehavior(behavior) {
        this.defaultBehaviors.push(behavior);
        this.bindBehaviors();

        return this;
    },
    /**
     * Set this component model
     *
     * @param {Model} model - A model
     */
    setModel: function setModel(model) {
        this.model = model;
        this.bindModel();
    },
    /**
     * Get the model
     *
     * @returns {null}
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
     * Hook called just before the component is rendered
     *
     * Override to perform any changes before the component is rendered
     */
    onPreRender: function onPreRender() {
    },
    /**
     * Hook called after the component is rendered
     *
     * Override to perform any changes after the component is rendered
     */
    onPostRender: function onPostRender() {
    },
    /**
     * Render the current element
     *
     * This method triggers the render of the component.
     * Rendering manipulates the dom element this component is attached to.
     * Usually, this would involve setting the visible and enabled states of the
     * component, as well as adjusting any attached attributes.
     *
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
                e.stopPropagation();
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
