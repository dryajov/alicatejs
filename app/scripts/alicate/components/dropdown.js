/**
 * Created by dmitriy.ryajov on 7/18/14.
 */
define(
    [
        'alicate/components/label',
        'alicate/components/repeater',
        'alicate/components/container',
        'alicate/components/component',
        'alicate/model'
    ],
    function makeInput(Label, Repeater, Container, Component, Model) {
        'use strict';

        /**
         * A module representing an dropdown
         *
         * @exports alicate/components/dropdown
         * @version 1.0
         */
        return Container.extend({
            defaults: function () {
                var props = Container.prototype.defaults.call(this),
                    that = this;

                return $.extend(props, {
                    /**
                     * A list of allowed html element selectors that this component
                     * can attach to
                     *
                     * @property allowedElements
                     * @type {String[]}
                     */
                    allowedElements: [
                        "select"
                    ],
                    children: {
                        /**
                         * The "select" tag
                         */
                        'select': new Repeater({
                            id: that.id + '-option',
                            model: that.model,
                            defaults: function () {
                                return {
                                    allowedElements: [
                                        "option"
                                    ]
                                }
                            },
                            makeItemObject: function (itemCount, data, $domElm) {
                                return new Component({
                                    id: this.id + '-' + itemCount,
                                    model: new Model({data: data}),
                                    $el: $domElm,
                                    parent: that,
                                    attributes: {
                                        value: data
                                    },
                                    render: function () {
                                        Component.prototype.render.call(this);
                                        this.$el.text(this.getModelData());
                                    }
                                });
                            }
                        })
                    }
                });

                return props;
            },
            selected: null,
            bindModel: function () {
            },
            render: function () {
                Container.prototype.render.call(this);

                if (null !== this.selected) {
                    this.$el.val(this.selected);
                }
            }
        });
    });
