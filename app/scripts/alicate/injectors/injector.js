/**
 * Created by dmitriy.ryajov on 7/23/15.
 */

'use strict';

var Base = require('./../base');

/**
 * @module injector
 */

/**
 * An "abstract" class to be used a base for an injector an Injector.
 *
 * Take a look at [OpiumInjector]{@link opium-injector.OpiumInjector} for an example implementation.
 *
 *
 * @class injector.Injector
 * @extends alicate.Base
 * @version 1.0
 */
/*jshint unused:false*/
module.exports = Base.extend(/** @lends injector.Injector.prototype */{
  /**
   * injector handle
   */
  injector: null,
  /**
   * resolver handle
   */
  resolver: null,
  /**
   * Inject a dependency
   *
   * @param dep - The dependency to be injected
   */
  inject: function inject(dep) {
    throw new Error('method unimplemented!');
  },
  /**
   * Register a dependency with the correct injector
   *
   * @param dep - The dependency to be registered
   */
  register: function register(dep) {
    throw new Error('method unimplemented!');
  },
  /**
   * This method takes a code ref that is able to perform
   * the wiring of the definitions according to the injector
   * rules.
   *
   * @param definition
   */
  wire: function wire(definition) {
    throw new Error('method unimplemented!');
  }
});
