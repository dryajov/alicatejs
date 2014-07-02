/**
 * Created by dmitriy.ryajov on 6/25/14.
 */
define(
    [
        'framework/components/container'
    ],
    function (container) {
        'use strict';

        return container.extend({
            /**
             * Callback called when this component is being rendered
             *
             * @function onRenderCallback
             */
            onRenderCallback: null,
            /**
             * Render the current component
             */
            render: function () {
                var data = this.model.getData(),
                    $parent = this.$el.parent(),
                    $domElm;

                // remove/detach element from the dom
                this.$el.remove(); // TODO: maybe we should use detach?
                if (typeof data !== 'Object' ||
                    typeof data !== 'Array') {
                    for (var elm in data) {
                        if (data.hasOwnProperty(elm)) {
                            $domElm = this.$el.clone();
                            if (this.onRenderCallback) {
                                this.onRenderCallback
                                    .call($domElm, data[elm]);
                            }
                            $parent.append($domElm);
                        }
                    }
                } else {
                    throw 'Model should return an Array or Object!';
                }
            }
        });
    }
);