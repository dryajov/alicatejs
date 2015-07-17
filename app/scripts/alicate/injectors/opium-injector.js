/**
 * Created by dmitriy.ryajov on 6/1/15.
 */
'use strict';

var Base = require('./../base');
var Opium = require('opium');
var Resolver = require('opium/app/scripts/resolvers/property-resolver');

var consts = require('opium/app/scripts/consts');

function nameHelper(name) {
    if (name === '/') {
        return 'index';
    }

    return name.replace('/\///g');
}

/**
 * @module injector
 */

/**
 * A class representing a label
 *
 *
 * @class injector.Injector
 * @extends alicate.Base
 * @version 1.0
 */
module.exports = Base.extend({
    injector: null,
    resolver: null,
    initialize: function initialize() {
        this.injector = new Opium('alicatejs');
        this.resolver = new Resolver(this.injector);
    },
    /**
     * Dependency to be injected
     *
     * @param dep
     */
    inject: function(name, dep) {
        var d = this.injector.getDep(nameHelper(name));
        if (d) {
            d.inject();
        }
    },
    /**
     * Register a dependency
     *
     * @param dep
     */
    register: function(name, dep) {
        this.resolver.register(nameHelper(name), dep, consts.INSTANCE);
    },
    wire: function(definition){
        definition.wire(this.injector);
    }
});
