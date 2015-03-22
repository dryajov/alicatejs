/**
 * Created by dmitriy.ryajov on 7/9/14.
 */
var Container = require('alicate/components/container'),
    Component = require('alicate/components/component');

function containerSpec() {
    'use strict';

    describe('Container suite', function () {
        describe('Container correctness', function () {
            describe('Container correctness', function () {
                var container;

                beforeEach(function () {
                    container = new Container({
                        id: "test"
                    });
                });

                it('Container class should exist', function () {
                    expect(Container).not.toBeNull();
                });

                it('Container to have id defined', function () {
                    expect(container.id).toBeDefined();
                });

                it('Container to have $el defined', function () {
                    expect(container.$el).toBeDefined();
                });

                it('Container to have model defined', function () {
                    expect(container.model).toBeDefined();
                });

                it('Container to have visible defined', function () {
                    expect(container.visible).toBeDefined();
                });

                it('Container to have defaultBehaviors defined', function () {
                    expect(container.defaultBehaviors).toBeDefined();
                });

                it('Container to have components defined', function () {
                    expect(container.children).toBeDefined();
                });

                it('Container to have getMarkup defined', function () {
                    expect(typeof container.getMarkup).toBe('function');
                });

                it('Container to have setVisible defined', function () {
                    expect(typeof container.setVisible).toBe('function');
                });

                it('Container to have isVisible defined', function () {
                    expect(typeof container.isVisible).toBe('function');
                });

                it('Container to have bindBehaviors defined', function () {
                    expect(typeof container.bindBehaviors).toBe('function');
                });

                it('Container to have addBehavior defined', function () {
                    expect(typeof container.addBehavior).toBe('function');
                });

                it('Container to have setModel defined', function () {
                    expect(typeof container.setModel).toBe('function');
                });

                it('Container to have getModel defined', function () {
                    expect(typeof container.getModel).toBe('function');
                });

                it('Container to have render defined', function () {
                    expect(typeof container.render).toBe('function');
                });

                it('Container to have bindModel defined', function () {
                    expect(typeof container.bindModel).toBe('function');
                });

                it('Container to have add defined', function () {
                    expect(typeof container.add).toBe('function');
                });

                it('Container to have replace defined', function () {
                    expect(typeof container.replace).toBe('function');
                });

                it('Container to have get defined', function () {
                    expect(typeof container.get).toBe('function');
                });

                it('Container to have getChildrenCount defined', function () {
                    expect(typeof container.getChildrenCount).toBe('function');
                });

                it('Container to have bind defined', function () {
                    expect(typeof container.bind).toBe('function');
                });

                it('Container to have bindComponent defined', function () {
                    expect(typeof container.bindComponent).toBe('function');
                });

                it('Container class to throw on missing id', function () {
                    function createCmp() {
                        return new Container();
                    }

                    expect(createCmp).toThrow();
                });
            });

            describe('Container visibility', function () {
                var container;

                beforeEach(function () {
                    var components = [];

                    for (var num in [1, 2, 3]) {
                        components.push(new Component({
                            id: 'test' + num,
                            $el: $('<div data-aid="test"' + num + '>some text</div>')
                        }));
                    }

                    container = new Container({
                        id: 'test-container',
                        children: components,
                        $el: $('<div data-aid=test-container></div>')
                    });
                });

                it('Component test visible', function () {
                    container.setVisible(true);

                    expect(container.isVisible()).toBe(true);
                    expect(container.$el.css('display')).toBe('block');
                });

                it('Component test hidden', function () {
                    container.setVisible(false);

                    expect(container.isVisible()).toBe(false);
                    expect(container.$el.css('display')).toBe('none');
                });

                it('Container test components visible', function () {
                    container.setVisible(true);

                    for (var key in container.children) {
                        var component = container.children[key];

                        expect(component.isVisible()).toBe(true);
                        expect(component.$el.css('display')).toBe('block');
                    }
                });

                it('Container test components hidden', function () {
                    container.setVisible(false);

                    for (var key in container.children) {
                        var component = container.children[key];

                        expect(component.isVisible()).toBe(false);
                        expect(component.$el.css('display')).toBe('none');
                    }
                });
            });

        });
    });

};
