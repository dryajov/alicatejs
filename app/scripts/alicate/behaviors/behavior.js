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
         * @extends Base
         * @version 1.0
         */
        return Base.extend({
            /**
             * @property {String} id - Any arbitrary identifier for this behavior
             */
            id: '',
            /**
             * @property {Component} component - The component that the behavior is attached to
             */
            component: null,
            /**
             * @property {Boolean} attached - Is this behavior attached
             */
            attached: false,
            /**
             * Attaches to the passed component
             *
             * @param {Component} component - Component to attach to
             */
            attach: function attach(component) {
                this.component = component;
                this.attached = true;
            }
        });
    });
