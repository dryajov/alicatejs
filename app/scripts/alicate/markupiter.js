/**
 * Created by dmitriy.ryajov on 7/15/14.
 */
define(
    [],
    function () {
        'use strict';

        /**
         * A module representing an markup iterator
         *
         * @exports alicate/markupiter
         * @version 1.0
         */
        return {
            createMarkupIter: function (elment, all) {
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
    });
