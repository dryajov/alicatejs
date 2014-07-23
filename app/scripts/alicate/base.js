/**
 * Created by dmitriy.ryajov on 6/26/14.
 */
define(
    [
        'jquery'
    ],
    function makeBase($) {
        "use strict";

        /**
         * Prototype object
         *
         * @param values
         * @returns {makeBase.BaseConstructor}
         * @constructor
         */
        var Base = function BaseConstructor(values) {
                var defaults = {},
                    classDefaults = typeof this.defaults === 'function'
                        ? this.defaults.call(values) : this.defaults;

                $.extend(true, defaults, classDefaults, values);
                this.defaults = defaults;

                if (!this.initialize) {
                    /**
                     * Sub types can override this method to perform post construction
                     * setup.
                     */
                    this.initialize = function initialize() {
                    };
                }

                $.extend(true, this, this.defaults);

                this.initialize.apply(this);
                return this;
            },

            /**
             * Sets up inheritance chain. See Backbone.js
             * {@link https://github.com/documentcloud/backbone/blob/master/backbone.js#L1527}
             *
             * @param protoProps
             * @param staticProps
             * @returns {*}
             */
            extend = function extend(protoProps, staticProps) {

                var parent = this,
                    child,
                    Surrogate;

                // The constructor function for the new subclass is either defined by you
                // (the "constructor" property in your `extend` definition), or defaulted
                // by us to simply call the parent's constructor.
                if (protoProps && protoProps.hasOwnProperty('constructor')) {
                    child = protoProps.constructor;
                } else {
                    child = function () {
                        return parent.apply(this, arguments);
                    };
                }

                // Add static properties to the constructor function, if supplied.
                $.extend(true, child, parent, staticProps);

                // Set the prototype chain to inherit from `parent`, without calling
                // `parent`'s constructor function.
                Surrogate = function () {
                    this.constructor = child;
                };
                Surrogate.prototype = parent.prototype;
                child.prototype = new Surrogate();

                // Add prototype properties (instance properties) to the subclass,
                // if supplied.
                if (protoProps) {
                    $.extend(true, child.prototype, protoProps);
                }

                // Set a convenience property in case the parent's prototype is needed
                // later.
                child.__super__ = parent.prototype;

                return child;

            };

        /**
         * Extend this type.
         * @method extend
         * @type {Function}
         * @returns {Function} Constructor for new sub-type.
         */
        Base.extend = extend;

        //export the
        return Base;
    });
