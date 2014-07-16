/**
 * Created by dmitriy.ryajov on 7/15/14.
 */
define(
    [],
    function () {
        'use strict';

        return {
            createMarkupIter: function (elment) {
                return document.createTreeWalker(elment, NodeFilter.SHOW_ELEMENT, {
                    acceptNode: function (node) {
                        if (node.getAttribute('data-aid')) {
                            return NodeFilter.FILTER_ACCEPT;
                        }

                        return NodeFilter.FILTER_SKIP;
                    }
                }, false);
            }
        }
    });
