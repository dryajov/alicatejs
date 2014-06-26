define(
[
    'jquery',
    'framework/component'
],
function($, component) {
    'use strict';

    var DATA_ATTR = '[data-eid]';
    return {
        scan: function ($template, view) {
            $('<div></div>').append($template).find(DATA_ATTR).each(function() {
                var id = $(this).data().eid,
                curComponent = view.get(id);

                curComponent.$el = $(this);
            });
        }
    };
});
