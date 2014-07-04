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
             * @function onRender
             */
            onRender: null,
            /**
             * The parent of this repeated element
             *
             * @property $parent
             * @type {jQuery}
             */
            $parent: null,
            /**
             * Called after the component is bound to an html element
             *
             */
            onBind: function () {
                this.$parent = this.$el.parent();
            },
            /**
             * Render the current component
             */
            render: function () {
                var data = this.model.get(),
                    $domElm,
                    that = this;

                if (!this.$el.is("div, p, span, li")) {
                    throw 'Invalid element!';
                }

                // remove/detach element from the dom
                this.$parent.html('');
                this.$el.remove();
                if (typeof data !== 'Object') {
                    for (var elm in data) {
                        if (data.hasOwnProperty(elm)) {

                            container.prototype.render.call(this);

                            $domElm = this.$el.clone();
                            this.$parent.append($domElm);

                            if (this.onRender) {
                                this.onRender
                                    .call($domElm, data[elm]);
                            }
                        }
                    }
                } else {
                    throw 'Model should return an Array or Object!';
                }
            }
        });
    }
);