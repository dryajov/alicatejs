/**
 * Created by dmitriy.ryajov on 7/18/14.
 */

'use strict';

var Repeater = require('./repeater'),
    Container = require('./container'),
    Component = require('./component'),
    Model = require('../model');


/**
 * @module select
 */

/**
 * This component allows you to attach behaviors to dropdown
 * like elements. As of now, this component will only attach
 * to the <em>select</em> element. It is required that the
 * <em>option</em> html element be nested inside the <em>select</em>
 * and that its <em>data-aid</em> name is a combination of the name of its
 * wrapping <em>select</em> and its appended the <em>-option</em> string.
 *
 * @example
 *
 * var dropdown = new Select({
 *      id: 'select',
 *      model: ["one", "two", "three"],
 *      selected: selectedDropDownModel.get().val
 * }).on('change', function (event) {
 *      selectedDropDownModel.set({val: event.target.value});
 * });
 *
 * @example
 *
 * <select data-aid="select">
 *      <option data-aid="select-option"></option>
 * </select>
 *
 * @class select.Select
 * @extends Container
 * @version 1.0
 */
module.exports = Container.extend(/** @lends select.Select.prototype */{
    initialize: function initialize() {
        Component.prototype.initialize.call(this);
        var that = this;

        this.on('change', function (event) {
            that.selected = event.target.value;
            that.index = event.target.index;
            that.render();
        });
    },
    instanceData: function instanceData() {
        var that = this;

        return {
            /**
             * A list of allowed html element selectors that this component
             * can attach to
             *
             * @type {String[]}
             *
             * @memberof select.Select
             * @instance
             */
            allowedElements: [
                'select'
            ],
            /**
             * List of components that
             *
             * have been attached to this view.
             *
             * @memberof select.Select
             * @instance
             */
            children: [
            /**
             * The "option" tag should have a data-aid with id "option"
             * otherwise the element wont bind correctly
             */
                new Repeater({
                    id: that.id + '-option',
                    model: that.model,
                    instanceData: function instanceData() {
                        return {
                            allowedElements: [
                                'option'
                            ]
                        };
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
            ]
        };
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
        this.$el.prop('selectedIndex', index ? index : 1);
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
    componentRender: function componentRender() {
        if (!Container.prototype.componentRender.call(this)) {
            return false;
        }

        if (null !== this.selected &&
            this.selected.length > 0) {
            this.$el.val(this.selected);
        } else {
            this.$el.prop('selectedIndex', this.index);
        }

        this.selected = this.$el.val();

        // initially the index may get to -1,
        // when the options are not completely rendered
        this.index = this.$el.prop('selectedIndex') < 0 ? 0
            : this.$el.prop('selectedIndex');

        return true;
    },
    /**
     * Triggered when the option item is being rendered
     *
     * @param option {repeater.Repeater} - The component associated with
     * the rendered option
     */
    onOptionRender: function onOptionRender() {
    },
    getOptionValue: null,
    getOptionText: null
});
