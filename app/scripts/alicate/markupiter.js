/**
 * Created by dmitriy.ryajov on 7/15/14.
 */
exports.markupIterFactory = function markupIterFactory() {
    'use strict';

    /**
     * A module representing an markup iterator
     *
     * @module MarkupIter
     * @exports alicate/markupiter
     * @version 1.0
     */
    return {
        /**
         * Create a markup iter
         *
         * @param {Dom} elment - The element to iterate on
         * @param {Boolean=false} all - Return all elements regardless
         *      if they are marked with a `data-aid` attribute or not
         * @returns {TreeWalker}
         * @static
         */
        createMarkupIter: function createMarkupIter(elment, all) {
            return document.createTreeWalker(elment, NodeFilter.SHOW_ELEMENT, {
                acceptNode: function (node) {
                    if (all) {
                        return NodeFilter.FILTER_ACCEPT;
                    }

                    if (node.getAttribute('data-aid')) {
                        return NodeFilter.FILTER_ACCEPT;
                    }

                    return NodeFilter.FILTER_SKIP;
                }
            }, false);
        }
    }
    };
