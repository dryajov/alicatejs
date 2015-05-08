/**
 * Created by dmitriy.ryajov on 6/26/14.
 */

/**
 * @module base
 */

'use strict';

var $ = require('jquery');

/**
 * Prototype object
 *
 * @class base.Base
 * @param values
 * @returns {Base}
 * @constructor
 */
var Base = function (values) {
        if (!this) {
            throw new Error('Invalid object invocation, make sure to use new!');
        }

        var instanceData = {},
            classDefaults = typeof this.instanceData === 'function'
                ? _reverseProtoChain(this, 'instanceData', values) : this.instanceData;

        $.extend(true, instanceData, classDefaults, values);
        this.instanceData = instanceData;

        if (!this.initialize) {
            /**
             * Sub types can override this method to perform post construction
             * setup.
             */
            this.initialize = function initialize() {
            };
        }

        $.extend(true, this, this.instanceData);

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
     *
     * @memberof base.Base
     * @static
     */
    extend = function extend(protoProps, staticProps) {
        'use strict';

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

    },
    /**
     * Reverse prototype chain, so that we can merge objects in reverse order,
     * starting with the parent and moving up in the inheritance chain
     *
     * @param obj
     * @param method
     * @param args
     * @returns {{}}
     * @private
     */
    _reverseProtoChain = function _reverseProtoChain(obj, method, args) {
        var proto = Object.getPrototypeOf(obj),
            result = {};
        if (proto) {
            result = _reverseProtoChain(proto, method, args);
            if (obj.hasOwnProperty(method)) {
                result = $.extend(true, result, obj[method].call(args));
            }
        }

        return result;
    };

/**
 * Extend this type.
 * @method extend
 * @type {Function}
 * @returns {Function} Constructor for new sub-type.
 */
Base.extend = extend;
module.exports = Base;
