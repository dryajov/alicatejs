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
         * @exports alicate/components/component
         * @version 1.0
         */
        return Base.extend({
            /**
             * Perform initial initialization
             *
             * <strong>NOTE:</strong>
             * Subclasses should <strong>always</strong> call the parent's
             * initialize function!
             */
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
                     * A list of default behaviors that components want to add
                     *
                     * @property {behavior[]} defaultBehaviors
                     */
                    defaultBehaviors: [],
                    /**
                     * A list of allowed html element selectors that this component
                     * can attach to
                     *
                     * @property {Boolean[]} allowedElements
                     */
                    allowedElements: [],
                    /**
                     * List of attributes of this component
                     *
                     * @property {Object} attributes
                     */
                    attributes: {},
                    /**
                     * List of properties of this component
                     *
                     * @property {Object} property
                     */
                    properties: {}
                }
            },
            /**
             * The id of the data element to attach to
             *
             * @property {String} id
             */
            id: '',
            /**
             * The html element reference that this component is attached to
             *
             * @property {Object} $el
             **/
            $el: null,
            /**
             * The model for this component
             *
             * @property _model
             */
            model: null,
            /**
             * A list of user attached behaviors associated with this component
             *
             * @property {Array} behaviors
             */
            behaviors: null,
            /**
             * Determines is the component is visible
             *
             * @property {Boolean} visible
             */
            visible: true,
            /**
             * The parent of this component
             *
             * @property {container} parent
             */
            parent: null,
            /**
             * Is component bout
             *
             * @property {Boolean} isBound
             */
            isBound: false,
            /**
             * Should the component be enabled/disabled
             *
             */
            enabled: true,
            /**
             * Enable/Disable the element
             * @param {Boolean} enabled
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
             * @param {String} attr
             * @param {String} val
             */
            setAttr: function (attr, val) {
                this.attributes[attr] = val;
                return this;
            },
            /**
             * Set html attribute
             *
             * @param {String} attr
             * @returns {*}
             */
            getAttr: function (attr) {
                return this.attributes[attr];
            },
            /**
             * Get html property
             *
             * @param prop
             * @returns {*}
             */
            getProp: function (prop) {
                return this.properties[prop];
            },
            /**
             * Set html property
             *
             * @param prop
             * @param val
             * @returns {*}
             */
            setProp: function (prop, val) {
                return this.properties[prop];
            },
            /**
             * Bind event handler to component for the specified event
             *
             * @param event
             * @param callback
             * @returns {Component}
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
             * @return {String}  getValue
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
                    throw 'Invalid element!';
                }
            },
            /**
             * Return the compiled markup of
             * this component
             *
             * @returns {*}
             */
            getMarkup: function () {
                return this.$el.html();
            },
            /**
             * Set component visibility
             *
             * @param {Boolean} visible
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
             */
            isVisible: function () {
                return this.visible;
            },
            /**
             * Attache the current behaviors
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
             * @param behavior
             */
            addBehavior: function (behavior) {
                this.defaultBehaviors.push(behavior);
                this.bindBehaviors();

                return this;
            },
            /**
             * Set this component model
             *
             * @method setModel
             * @param model
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
             * @returns {*}
             */
            getModelData: function () {
                if (this.model && this.model.get) {
                    return this.model.get();
                }

                return this.model;
            },
            /**
             * Render the current element
             *
             * @method render
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
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            bind: function (markupIter) {
                this.isBound = true;
            }
        });
    });
