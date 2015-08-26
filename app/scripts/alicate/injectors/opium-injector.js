/**
 * Created by dmitriy.ryajov on 6/1/15.
 */
'use strict';

var Injector = require('./injector');
var Opium = require('opium-ioc');
var Resolver = require('opium-ioc/app/scripts/resolvers/property-resolver');

var consts = require('opium-ioc/app/scripts/consts');

/**
 * @module opium-injector
 */

/**
 * A class representing an opium-ioc based injector
 *
 *
 * @class opium-injector.OpiumInjector
 * @extends alicate.Injector
 * @version 1.0
 */
module.exports = Injector.extend(/** @lends opium-injector.OpiumInjector.prototype*/{
    initialize: function initialize() {
        this.injector = new Opium('alicatejs');
        if (!this.resolver) {
            this.resolver = new Resolver(this.injector);
        }
    },
    /**
     * Inject a dependency
     *
     * @param dep
     */
    inject: function (dep) {
        var d = this.injector.getDep(dep.internalId);
        if (d) {
            d.inject();
            console.log('Injected dependency ' + d.name + ' with component id: ' + dep.id);
        }
    },
    /**
     * Register a dependency with opium-ioc.
     *
     * The dependency is always registered as an INSTANCE type.
     *
     * @param dep
     */
    register: function (dep) {
        var d = this.injector.getDep(dep.internalId);
        if (!d) {
            this.resolver.register(dep.internalId, dep, {type: consts.INSTANCE});
            console.log('Registered dependency ' + dep.id);
        }
    },
    /**
     * This method takes a code ref that is able to perform
     * the wiring of the dependencies according to the definition
     * rules. In the case of opium-injector, it expects an object
     * with a wire method, that takes an opium-ioc instance as parameter.
     *
     * The bellow example shows a possible <pre>wire</pre> definition.
     *
     * @example
     *  {
     *   wire: function (injector) {
     *    injector.registerInstance('connectorsRegistry', Registry);
     *
     *    injector.registerFactory('connectors', function (registry) {
     *      var connectors = new Connectors({connectorsRegistry: registry});
     *           connectors.init();
     *           return connectors;
     *       }, ['connectorsRegistry']);
     *
     *      // player
     *     injector.registerInstance('playerConfig', PlayerConfig);
     *     injector.registerInstance('player', new Player(), ['playerConfig']);
     *     injector.registerInstance('playListManager', new PlayListManager(), ['player']);
     *     injector.registerInstance('playerPlayList', new PlayerPlayList(), ['player', 'playListManager', 'connectors']);
     *   }
     * }
     *
     * @param definition
     */
    wire: function (definition) {
        definition.wire(this.injector);
    }
});
