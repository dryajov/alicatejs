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
         * A module representing a dropdown
         *
         * @module Select
         * @exports alicate/components/select
         * @extends Container
         * @version 1.0
         */
        return Container.extend({
            initialize: function () {
                var that = this;

                this.on('change', function (event) {
                    that.selected = event.target.value;
                    that.index = event.target.index;
                });
            },
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
                    /**
                     * @property {Object} components - List of components that have been attached to this view.
                     */
                    children: {
                        /**
                         * The "select" tag
                         */
                        select: new Repeater({
                            id: that.id + '-option',
                            model: that.model,
                            defaults: function () {
                                return {
                                    allowedElements: [
                                        "option"
                                    ]
                                }
                            },
                            /**
                             * @override
                             */
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
            /**
             * @property {String} - Indicates the currently selected
             */
            selected: null,
            index: 0,
            /**
             * Set the selected option by value
             *
             * @param {String} val - value to set active
             */
            setSelected: function (val) {
                this.selectedVal = val;
                this.render();
                return this;
            },
            /**
             * Get the currently selected value
             *
             * @returns {String}
             */
            getSelected: function () {
                return this.selectedVal;
            },
            /**
             * Set the current selection by index
             *
             * @param {Integer} index - Current index to be selected
             */
            setSelectedByIndex: function (index) {
                this.$el.prop('selectedIndex', 1);
                this.index = index;
                this.selected = this.$el.val();
                this.render();
                return this;
            },
            /**
             * @override
             */
            getValue: function () {
                return this.getSelected();
            },
            /**
             * @override
             */
            bindModel: function () {
            },
            /**
             * @override
             */
            render: function () {
                Container.prototype.render.call(this);

                if (null !== this.selected) {
                    this.$el.val(this.selected);
                } else {
                    this.$el.prop('selectedIndex', this.index);
                }

                this.selected = this.$el.val();
                this.index = this.$el.prop('selectedIndex');
            }
        });
    });
