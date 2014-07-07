/**
 * A module representing a component.
 *
 * @module component
 */
define(
    [
        'framework/base',
        'jquery'
    ],
    function (base, $) {
        'use strict';

        /**
         * A module representing a component
         * @exports framework/components/component
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
                    defaultBehaviors: []
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
             * Set component visibility
             *
             * @param {Boolean} visible
             */
            setVisible: function (visible) {
                if (this.$el) {
                    if (this.visible != visible) {
                        if (visible) {
                            this.$el.show();
                        } else {
                            this.$el.hide();
                        }
                        this.render();
                    }
                }

                this.visible = visible;
            },
            /**
             * Is component visible
             *
             */
            isVisible: function() {
                return this.visible;
            },
            /**
             * Attache the current behaviors
             *
             */
            bindBehaviors: function () {
                for (var behavior in this.defaultBehaviors) {
                    if (this.defaultBehaviors.hasOwnProperty(behavior) && !this.defaultBehaviors[behavior].attached) {
                        this.defaultBehaviors[behavior].attach(this);
                    }
                }
            },
            /**
             * Add a behavior to the component
             * Causes
             *
             * @param behavior
             */
            addBehavior: function (behavior) {
                this.defaultBehaviors.push(behavior);
                this.bindBehaviors();
            },
            /**
             *
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
             * Render the current element
             *
             * @method render
             */
            render: function () {
                if (!this.visible) {
                    this.$el && this.$el.hide();
                } else {
                    this.$el && this.$el.show();
                }
            },
            /**
             * Bind the current model
             *
             */
            bindModel: function () {
                var $el = this.$el,
                    model = this.model,
                    component = this,
                    event = 'change.' + this.id;

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
