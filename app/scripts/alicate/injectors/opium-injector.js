/**
 * Created by dmitriy.ryajov on 6/1/15.
 */
'use strict';

var Base = require('./../base');
var Opium = require('opium-ioc');
var Resolver = require('opium-ioc/app/scripts/resolvers/property-resolver');

var consts = require('opium-ioc/app/scripts/consts');

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
    inject: function (dep) {
        var d = this.injector.getDep(nameHelper(dep.id));
        if (d) {
            d.inject();
            console.log('Injected dependency ' + d.name);
        }
    },
    /**
     * Register a dependency
     *
     * @param dep
     */
    register: function (dep) {
        var d = this.injector.getDep(nameHelper(dep.id));
        if (!d) {
            this.resolver.register(nameHelper(dep.id), dep, consts.INSTANCE);
            console.log('Registered dependency ' + dep.id);
        }
    },
    wire: function (definition) {
        definition.wire(this.injector);
    }
});
