/**
 * Created by dmitriy.ryajov on 7/21/15.
 */
/**
 * Created by dmitriy.ryajov on 7/9/14.
 */

'use strict';

var StackedContainer = require('../../../app/scripts/alicate/components/stacked-container'),
    Component = require('../../../app/scripts/alicate/components/component'),
    $ = require('jquery');

describe('StackedContainer suite', function () {
    describe('StackedContainer correctness', function () {
        describe('StackedContainer correctness', function () {
            var container;

            beforeEach(function () {
                container = new StackedContainer({
                    id: "test"
                });
            });

            it('StackedContainer class should exist', function () {
                expect(StackedContainer).not.toBeNull();
            });

            it('StackedContainer to have id defined', function () {
                expect(container.id).toBeDefined();
            });

            it('StackedContainer to have $el defined', function () {
                expect(container.$el).toBeDefined();
            });

            it('StackedContainer to have model defined', function () {
                expect(container.model).toBeDefined();
            });

            it('StackedContainer to have visible defined', function () {
                expect(container.visible).toBeDefined();
            });

            it('StackedContainer to have defaultBehaviors defined', function () {
                expect(container.defaultBehaviors).toBeDefined();
            });

            it('StackedContainer to have components defined', function () {
                expect(container.children).toBeDefined();
            });

            it('StackedContainer to have getMarkup defined', function () {
                expect(typeof container.getMarkup).toBe('function');
            });

            it('StackedContainer to have setVisible defined', function () {
                expect(typeof container.setVisible).toBe('function');
            });

            it('StackedContainer to have isVisible defined', function () {
                expect(typeof container.isVisible).toBe('function');
            });

            it('StackedContainer to have bindBehaviors defined', function () {
                expect(typeof container.bindBehaviors).toBe('function');
            });

            it('StackedContainer to have addBehavior defined', function () {
                expect(typeof container.addBehavior).toBe('function');
            });

            it('StackedContainer to have setModel defined', function () {
                expect(typeof container.setModel).toBe('function');
            });

            it('StackedContainer to have getModel defined', function () {
                expect(typeof container.getModel).toBe('function');
            });

            it('StackedContainer to have render defined', function () {
                expect(typeof container.render).toBe('function');
            });

            it('StackedContainer to have bindModel defined', function () {
                expect(typeof container.bindModel).toBe('function');
            });

            it('StackedContainer to have add defined', function () {
                expect(typeof container.add).toBe('function');
            });

            it('StackedContainer to have replace defined', function () {
                expect(typeof container.replace).toBe('function');
            });

            it('StackedContainer to have get defined', function () {
                expect(typeof container.get).toBe('function');
            });

            it('StackedContainer to have getChildrenCount defined', function () {
                expect(typeof container.getChildrenCount).toBe('function');
            });

            it('StackedContainer to have bind defined', function () {
                expect(typeof container.bind).toBe('function');
            });

            it('StackedContainer to have bindComponent defined', function () {
                expect(typeof container.bindComponent).toBe('function');
            });

            it('StackedContainer class to throw on missing id', function () {
                function createCmp() {
                    return new StackedContainer();
                }

                expect(createCmp).toThrow();
            });
        });

        describe('StackedContainer visibility', function () {
            var container;

            beforeEach(function () {
                var components = [];

                for (var num in [1, 2, 3]) {
                    var component =  new Component({
                        id: 'test' + num,
                        $el: $('<div data-aid="test"' + num + '>some text</div>')
                    });

                    component.isBound = true;
                    component.bindModel();
                    component.render();

                    components.push(component);
                }

                container = new StackedContainer({
                    id: 'test-container',
                    children: components,
                    $el: $('<div data-aid=test-container></div>')
                });

                container.isBound = true;
                container.bindModel();
                container.render();
            });

            it('Component test visible', function () {
                container.setVisible(false);
                container.setVisible(true);

                expect(container.isVisible()).toBe(true);
                expect(container.$el.css('display')).toBe('');
            });

            it('Component test hidden', function () {
                container.setVisible(false);

                expect(container.isVisible()).toBe(false);
                expect(container.$el.css('display')).toBe('none');
            });

            it('StackedContainer test components active', function () {
                container.setActive(1);
                var component1 = container.getActive();

                // expect active to be component 1
                expect(component1.id).toBe('test1');
                expect(component1.$el.css('display')).toBe('');

                container.setActive(2);
                expect(component1.$el.css('display')).toBe('none');

                var component2 = container.getActive();
                expect(component2.id).toBe('test2');
                expect(component2.$el.css('display')).toBe('');
            });
        });

    });
});

