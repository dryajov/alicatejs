define(
    [
        'alicate/base',
        'alicate/behaviors/eventable',
        'jquery'
    ],
    function makeComponent(Base, Eventable, $) {
        'use strict';

        /**
         * A module representing a component
         *
         * @module Component
         * @exports alicate/components/component
         * @extends Base
         * @version 1.0
         */
        return Base.extend({
            initialize: function () {
                if (this.behaviors) {
                    $.merge(this.defaultBehaviors, this.behaviors);
                }

                if (!this.id || (this.id && this.id.length < 1)) {
                    throw 'Missing id!'
                }
            },
            defaults: function () {
                return {
                    /**
                     * @property {behavior[]} defaultBehaviors - A list of default behaviors of the component
                     */
                    defaultBehaviors: [],
                    /**
                     * @property {Boolean[]} allowedElements - Elements this component can attach to
                     */
                    allowedElements: [],
                    /**
                     * @property {Object} attributes - List of attributes of this component
                     */
                    attributes: {},
                    /**
                     * @property {Object} property - List of properties of this component
                     */
                    properties: {}
                }
            },
            /**
             * @property {String} id - The id of the data element to attach to
             */
            id: '',
            /**
             * @property {Object} $el - The html element reference that this component is attached to
             **/
            $el: null,
            /**
             * @property model - The model for this component
             */
            model: null,
            /**
             * @property {Array} behaviors - A list of user attached behaviors associated with this component
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
             * @param {Boolean} enabled - Enable/Disable the element
             */
            setEnabled: function (enabled) {
                if (this.enabled !== enabled) {
                    this.enabled = enabled;
                    this.render();
                }
            },
            /**
             * Get html attribute
             *
             * @param {String} attr - Attribute name
             * @param {String} val - Value
             */
            setAttr: function (attr, val) {
                this.attributes[attr] = val;
                return this;
            },
            /**
             * Set html attribute
             *
             * @param {String} attr - Attribute name
             * @returns {Any}
             */
            getAttr: function (attr) {
                return this.attributes[attr];
            },
            /**
             * Get html property
             *
             * @param {String} prop - Property name
             * @returns {*}
             */
            getProp: function (prop) {
                return this.properties[prop];
            },
            /**
             * Set html property
             *
             * @param {String} prop - Property name
             * @param {Any} val - Value
             * @returns {Any}
             */
            setProp: function (prop, val) {
                return this.properties[prop];
            },
            /**
             * Bind event handler to component for the specified event
             *
             * @param {Event} event - Event name
             * @param callback - Callback
             * @returns {this}
             */
            on: function (event, callback) {
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
            getValue: function () {
                var value;

                if ($(this).is("input, textarea, select")) {
                    value = $(this).val();
                } else {
                    value = $(this).text();
                }

                return value;
            },
            /**
             * Performs a check if this is an element we can attach to
             *
             */
            _checkIsValidElement: function () {
                if (!this.$el) {
                    throw 'Element ' + this.id + ' is not bound!';
                }

                if (!this.$el.is(this.allowedElements.join(','))) {
                    throw 'Invalid element!\n' +
                        'Element: ' + this.$el.prop("tagName");
                }
            },
            /**
             * Return the compiled markup of this component
             *
             * @returns {Any}
             */
            getMarkup: function () {
                return this.$el.html();
            },
            /**
             * Set component visibility
             *
             * @param {Boolean} visible - Set visible/hidden
             */
            setVisible: function (visible) {
                if (this.$el) {
                    if (this.visible != visible) {
                        this.visible = visible;
                        this.render();
                    }
                }
            },
            /**
             * Is component visible
             *
             * @return {Boolean}
             */
            isVisible: function () {
                return this.visible;
            },
            /**
             * Attache the behaviors
             *
             */
            bindBehaviors: function () {
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
             * Add a behavior to the component
             *
             * @param {Behavior} behavior - The behavior to be added
             */
            addBehavior: function (behavior) {
                this.defaultBehaviors.push(behavior);
                this.bindBehaviors();

                return this;
            },
            /**
             * Set this component model
             *
             * @param {Model} model - A model
             */
            setModel: function (model) {
                this.model = model;
                this.bindModel();
            },
            /**
             * Get the model
             *
             * @returns {null}
             */
            getModel: function () {
                return this.model;
            },
            /**
             * Get this component model's data
             *
             * @returns {Any}
             */
            getModelData: function () {
                if (this.model && this.model.get) {
                    return this.model.get();
                }

                return this.model;
            },
            /**
             * Render the current element
             */
            render: function () {
                this.bindBehaviors();

                if (this.$el) {
                    for (var attr in this.attributes) {
                        this.$el.attr(attr, this.attributes[attr]);
                    }

                    if (!this.isVisible()) {
                        this.$el.hide();
                    } else {
                        this.$el.show();
                    }

                    this.$el.prop('disabled', !this.enabled);
                }
            },
            /**
             * Scan the template and attach components to html elements
             */
            bind: function (markupIter) {
                this.isBound = true;
            },
            /**
             * Bind the current model
             */
            bindModel: function () {
                var $el = this.$el,
                    model = this.model,
                    component = this,
                    event = 'change.' + this.id,
                    that = this;

                if (!$el) {
                    return;
                }

                $el.off(event);
                $el.on(event, function () {
                    model.set(that.getValue());
                });

                model.subscribe(function () {
                    component.render();
                });
            }
        });
    });
