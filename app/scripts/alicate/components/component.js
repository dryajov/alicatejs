'use strict';

/**
 * @module component
 */

var Base = require('../base'),
    Eventable = require('../behaviors/eventable'),
    Model = require('../model'),
    RenderState = require('../enums/render'),
    _ = require('lodash'),
    Guid = require('guid');


/**
 * @callback component.Component~eventCallback
 * @param {Event} event
 */

/**
 * Component is the building block of alicatejs.
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

        if (!this.isIdValid()) {
            throw new Error('Missing id!');
        }

        this.internalId = Guid.raw();

        this.inject();
    },
    /**
     * Check if id is valid and present
     *
     * @private
     * @returns {boolean}
     */
    isIdValid: function isIdValid() {
        if (!this.id || (this.id && this.id.length < 1)) {
            return false;
        }

        return true;
    },
    instanceData: function instanceData() {
        return {
            /**
             * A list of default behaviors that this controller contains.
             * It makes sense to implement some core functionality as behaviors
             * that can be shared across many components. For example {@link eventable.Eventable|Eventable}
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
             * passed directly to jQuery's attr method.
             *
             * @property {Object} - Map of attributes of this component
             *
             * @memberof component.Component
             * @instance
             */
            attributes: {},
            /**
             * A key/value pair of properties for this component. This is passed directly
             * to jQuery's prop method.
             *
             * @property {Object} - Map of properties of this component
             *
             * @memberof component.Component
             * @instance
             */
            properties: {},
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
             * @private
             */
            _renderState: RenderState.UNRENDERED,
            /**
             * @property {AlicateApp} - The current alicatejs app
             */
            app: null,
            /**
             * @property {Boolean} hasRendered - flag signaling if the model has
             * changed since the last time the model got updated
             */
            hasRendered: false,
            /**
             * @private
             */
            internalId: ''
        };
    },
    /**
     * @param {Boolean} enabled - Enable/Disable the element
     */
    setEnabled: function setEnabled(enabled) {
        this.enabled = this.enabled === enabled;
        this.render();
    },
    /**
     * Set an html attribute
     *
     * @param {String} attr - Attribute name
     * @param {String} val - Value
     */
    setAttr: function setAttr(attr, val) {
        this.attributes[attr] = val;
        return this;
    },
    /**
     * Get an html attribute
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
        this.properties[prop] = val;
        return this;
    },
    /**
     * Callback called when the model has changed. It's
     * triggered right after the model has been updated with new data,
     * and this component has been rendered.
     *
     * @param newVal - the new val set on the model
     * @param oldVal - the old value the model held
     */
    onModelChanged: function onModelChanged() {
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
            id: event + '.' + this.id,
            event: event,
            handler: callback
        }));

        return this;
    },
    off: function off(event) {
        this.removeBehavior(event + '.' + this.id);
    },
    /**
     * Get the current rendered value of this component
     *
     * @return {String}
     */
    getValue: function getValue() {
        var value;

        if (this.$el.is('input, textarea, select')) {
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
                    this.$el.prop('tagName') + ' tag');
            }
        } else {
            if (!this.isBound) {
                throw new Error('Element ' + this.id + ' is not bound!');
            }
        }
    },
    /**
     * Return the compiled markup for this component
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
        if (this.isVisible() !== visible) {
            this.visible = visible;
            console.log('setting component id: ' + this.id + ' to visible: ' + this.visible);
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
     *
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
                    case RenderState.ENTER:
                        this.defaultBehaviors[behavior].onEnter(this);
                        break;
                    case RenderState.EXIT:
                        this.defaultBehaviors[behavior].onExit(this);
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
    removeBehavior: function removeBehavior(id) {
        var behavior = this.defaultBehaviors.filter(function (bh) {
            if (bh.id === id) {
                return bh;
            }
        });

        var index = this.defaultBehaviors.indexOf(behavior);
        behavior.detach(); // detach behavior
        this.defaultBehaviors = this.defaultBehaviors.splice(index, 1);
    },
    /**
     * Set this component's model
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
     * provide its render functionality.
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

            for (var attr in this.attributes) {
                this.$el.attr(attr, this.attributes[attr]);
            }

            if ((this.parent && this.parent.isVisible()) || !this.parent)  {
                this.$el.css('display', !this.isVisible() ? 'none' : '');
            }

            if (this.$el.prop('disabled') !== this.enabled) {
                this.$el.prop('disabled', !this.enabled);
            }

            this._renderState = RenderState.PRE_RENDER;
            this.onPreRender();

            // run behaviors before rendering
            this.runBehaviors();

            // call components render
            this.componentRender();

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
     * Called when the component has been bound but not yet rendered.
     * Usually a component is bound only once during its lifetime, with the exception
     * of the {@link repeater.Repeater|Repeater} component, which re-binds its children
     * every time its re-rerendered.
     */
    onComponentBound: function onComponentBound() {
    },
    /**
     * Scan the template and attach components to html elements
     *
     * @param markupIter {MarkupIter}
     */
    bind: function bind() {
        this.isBound = true;

        this.inject();

        this.onComponentBound();
        this.bindBehaviors();
    },
    /**
     * Inject this component with the required dependencies
     */
    inject: function inject() {
        if (this.app && this.app.injector) {
            this.app.injector.register(this);
            this.app.injector.inject(this);
        }
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
            $el.on(event, function () {
                model.set(that.getValue());
            });

            model.subscribe(function (newVal, oldVal) {
                if (!_.isEqual(newVal, oldVal)) {
                    component.hasRendered = false;
                    component.onModelChanged(newVal, oldVal);
                    component.render();
                }
            });
        }
    },
    /**
     * Called once when the component is about to become active.
     *
     * This action is typically initiated by a top level container,
     * such as a View or a StackedContainer.
     *
     * Make sure to call super in order to get the correct dependency
     * injection behavior, since inject is called on this object
     * on every enter.
     */
    onEnter: function onEnter() {
    },
    /**
     * Called once when the component is about to become inactive.
     *
     * This action is typically initiated by a top level container,
     * such as a View or a StackedContainer.
     */
    onExit: function onExit() {
    },
    /**
     * Called by the framework to indicate that component is being entered
     *
     * @private
     */
    enter: function enter() {
        if (this.app && this.app.injector) {
            this.app.injector.inject(this);
        }

        this._renderState = RenderState.ENTER;
        this.runBehaviors();
        this.onEnter();
    },
    /**
     * Called by the framework to indicate that component is being exited
     *
     * @private
     */
    exit: function exit() {
        this._renderState = RenderState.EXIT;
        this.runBehaviors();
        this.onExit();
    }
});
