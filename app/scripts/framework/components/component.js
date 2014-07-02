/**
 * This is an abstract base class for components to inherit from
 */
define(
    [
        'framework/base',
        'jquery'
    ],
    function (base, $) {
        'use strict';

        return base.extend({
            initialize: function () {
                $.merge(this.defaultBehaviors, this.behaviors);
            },
            /**
             * The id of the element to attach to
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
             * A list of default behaviors that components want to add
             *
             * @property defaultBehaviors
             * @type {behavior}
             */
            defaultBehaviors: [],
            /**
             * A list of user attached behaviors associated with this component
             *
             * @property _behavior
             * @type {Array}
             */
            behaviors: [],
            /**
             * Attache the current behaviors
             *
             */
            attachBehaviors: function() {
                for (var behavior in this.defaultBehaviors) {
                    this.defaultBehaviors[behavior].attach(this);
                }
            },
            /**
             *
             * @param behavior
             */
            addBehavior: function (behavior) {
                this.defaultBehaviors.push(behavior);
            },
            /**
             * @method setModel
             * @param model
             */
            setModel: function (model) {
                var that = this;

                model.listen(function () {
                    that.render.apply(that)
                });
                this.model = model;
            },
            /**
             * Render the current element
             *
             * @method render
             */
            render: function () {
                throw 'Method unimplemented!';
            }
        });
    });
