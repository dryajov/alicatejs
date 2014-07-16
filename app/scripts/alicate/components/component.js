/**
 * A module representing a component.
 *
 * @module component
 */
define(
    [
        'alicate/base',
        'jquery'
    ],
    function makeComponent(base, $) {
        'use strict';

        /**
         * A module representing a component
         *
         * @exports alicate/components/component
         * @version 1.0
         */
        return base.extend({
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
                     * @property defaultBehaviors
                     * @type {behavior[]}
                     */
                    defaultBehaviors: [],
                    /**
                     * A list of allowed html element selectors that this component
                     * can attach to
                     *
                     * @property allowedElements
                     * @type {Boolean[]}
                     */
                    allowedElements: []
                }
            },
            /**
             * The id of the data element to attach to
             *
             * @property id
             * @type {String}
             */
            id: '',
            /**
             * The html element reference that this component is attached to
             *
             * @property $el
             * @type {Object}
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
             * @property _behavior
             * @type {Array}
             */
            behaviors: null,
            /**
             * Determines is the component is visible
             *
             * @property visible
             * @type {Boolean}
             */
            visible: true,
            /**
             * The parent of this component
             *
             * @property {container}
             */
            parent: null,
            /**
             * Get the current rendered value of this component
             *
             * @return {String}
             */
            getValue: function () {
                return this.$el.text();
            },
            /**
             * Performs a check if this is an element we can attach to
             *
             */
            _checkIsValidElement: function () {
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
                for (var behavior in this.defaultBehaviors) {
                    if (this.defaultBehaviors.hasOwnProperty(behavior) &&
                        !this.defaultBehaviors[behavior].attached) {
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
                if (!this.isVisible()) {
                    this.$el && this.$el.hide();
                } else {
                    this.$el && this.$el.show();
                }
            },
            /**
             * Bind the current model
             */
            bindModel: function () {
                var $el = this.$el,
                    model = this.model,
                    component = this,
                    event = 'change.' + this.id;

                if (!$el) {
                    return;
                }

                $el.off(event);
                $el.on(event, function () {
                    var value;

                    if ($(this).is("input, textarea, select")) {
                        value = $(this).val();
                    } else {
                        value = $(this).text();
                    }

                    model.set(value);
                });

                model.subscribe(function () {
                    component.render();
                });
            }
        });
    });
