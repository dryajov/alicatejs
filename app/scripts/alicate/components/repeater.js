/**
 * Created by dmitriy.ryajov on 6/25/14.
 */

/**
 * A module representing a repeater
 *
 * @module repeater
 */
define(
    [
        'alicate/components/container'
    ],
    function makeRepeater(container) {
        'use strict';

        /**
         * A module representing a repeater
         *
         * @exports alicate/components/repeater
         * @version 1.0
         */
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
             * Called to bind this and children components to the html element
             *
             */
            bind: function (markupIter) {
                this.$parent = this.$el.parent() || this.$el.appendTo('<div></div>');
                container.prototype.bind.call(this, markupIter);
            },
            /**
             * Bind the component to the html element
             *
             * @param component
             * @param $element
             */
            bindComponent: function (component, $element) {
            },
            /**
             * Render the current component
             */
            render: function () {
                var data = this.getModelData(),
                    $domElm, component;

                if (!this.$el.is("div, p, span, li")) {
                    throw 'Invalid element!';
                }

                // remove/detach element from the dom
                this.$parent.html('');
                this.$el.remove();
                if (typeof data !== 'Object') {
                    for (var elm in data) {
                        if (data.hasOwnProperty(elm)) {

                            $domElm = this.$el.clone();

                            // run through the list of components and render them
                            for (var key in this.components) {
                                component = this.components[key];

                                // if this is a function then call it,
                                // it should construct a component
                                if (typeof component === 'function') {
                                    component = component();
                                    component.$el = $domElm.find('[data-aid=' + component.id + ']');
                                    if (!component.$el) {
                                        throw 'Unable to find elemnt with ID: ' + component.id;
                                    }

                                    component.id = component.id + '-' + elm; // make new id
                                    component.bindBehaviors();

                                    if (component.getChildrenCount &&
                                        component.getChildrenCount()) {
                                        var markupIter = document.createTreeWalker(component.$el[0], NodeFilter.SHOW_ELEMENT, {
                                            acceptNode: function (node) {
                                                return NodeFilter.FILTER_ACCEPT;
                                            }
                                        }, false);
                                        component.bind(markupIter);
                                    }

                                    component.visible = this.visible;
                                    component.render();
                                } else {
                                    throw 'Repeaters require a constructor function for contained elements.\n' +
                                        'Wrap you component in a function() { return new Label({...}); }';
                                }
                            }
                            this.$parent.append($domElm);

                            if (this.onRender) {
                                this.onRender
                                    .call($domElm, data[elm]);
                            }
                        }
                    }

                    if (!this.isVisible()) {
                        this.$el && this.$el.hide();
                    } else {
                        this.$el && this.$el.show();
                    }

                } else {
                    throw 'Model should return an Array or Object!';
                }
            }
        });
    }
);