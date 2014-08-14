/**
 * Created by dmitriy.ryajov on 7/18/14.
 */
define(
    [
        'jquery',
        'alicate/components/label',
        'alicate/components/repeater',
        'alicate/components/container',
        'alicate/components/component',
        'alicate/model'
    ],
    function makeSelect($, Label, Repeater, Container, Component, Model) {
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
            initialize: function initialize() {
                var that = this;

                this.on('change', function (event) {
                    that.selected = event.target.value;
                    that.index = event.target.index;
                    that.render();
                });
            },
            defaults: function defaults() {
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
                     * @property {Object} components - List of components that
                     * have been attached to this view.
                     */
                    children: {
                        /**
                         * The "option" tag should have a data-aid with id "option"
                         * otherwise the element wont bind correctly
                         */
                        option: new Repeater({
                            id: that.id + '-option',
                            model: that.model,
                            defaults: function defaults() {
                                return {
                                    allowedElements: [
                                        "option"
                                    ]
                                }
                            },
                            /**
                             * @override
                             */
                            makeItemObject: function makeItemObject(itemCount, data, $domElm) {
                                return new Component({
                                    id: this.id + '-' + itemCount,
                                    model: new Model({data: data}),
                                    $el: $domElm,
                                    parent: that,
                                    attributes: {
                                        value: data
                                    },
                                    render: function render() {
                                        Component.prototype.render.call(this);
                                        this.$el.text(this.getModelData());
                                    }
                                });
                            },
                            onItemRender: function onItemRender(item) {
                                if (that.onOptionRender) {
                                    that.onOptionRender(item);
                                }
                            }
                        })
                    }
                });

                return props;
            },
            /**
             * @property {String} - The currently selected value
             */
            selected: null,
            /**
             * @property {Integer} - The currently selected index
             */
            index: 0,
            /**
             * Set the selected option by value
             *
             * @param {String} val - value to set active
             */
            setSelected: function setSelected(val) {
                this.selected = val;
                this.render();
                return this;
            },
            /**
             * Get the currently selected value
             *
             * @returns {String}
             */
            getSelected: function getSelected() {
                return this.selected;
            },
            /**
             * Set the current selection by index
             *
             * @param {Integer} index - Current index to be selected
             */
            setSelectedByIndex: function setSelectedByIndex(index) {
                this.$el.prop('selectedIndex', 1);
                this.index = index;
                this.selected = this.$el.val();
                this.render();
                return this;
            },
            /**
             * @override
             */
            getValue: function getValue() {
                return this.$el.val();
            },
            /**
             * @override
             */
            bindModel: function bindModel() {
                var that = this;

                if (this.model instanceof Model) {
                    this.model.subscribe(function () {
                        that.render();
                    });
                }
            },
            /**
             * @override
             */
            render: function render() {
                Container.prototype.render.call(this);

                if (null !== this.selected &&
                    this.selected.length > 0) {
                    this.$el.val(this.selected);
                } else {
                    this.$el.prop('selectedIndex', this.index);
                }

                this.selected = this.$el.val();
                this.index = this.$el.prop('selectedIndex');
            },
            /**
             * Triggered when the option item is being rendered
             *
             * @param option - The component associated with
             * the rendered option
             */
            onOptionRender: function onOptionRender(option) {
            }
        });
    });
