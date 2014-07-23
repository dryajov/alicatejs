/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'alicate/base'
    ],
    function makeBehavior(Base) {

        /**
         * A module representing a behavior
         *
         * @module Behavior
         * @exports alicate/behaviors/behavior
         * @version 1.0
         */
        return Base.extend({
            /**
             * Any arbitrary identifier for this behavior
             *
             * @property id
             * @type {String}
             */
            id: '',
            /**
             * The component that the behavior is attached to
             *
             * @property component
             * @type {component}
             */
            component: null,
            /**
             * Is this behavior attached
             *
             * @property attached
             * @type {Boolean}
             */
            attached: false,
            /**
             * Attaches to the passed component
             *
             * @param {component} component
             */
            attach: function (component) {
                this.component = component;
                this.attached = true;
            }
        });
    });
