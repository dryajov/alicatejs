/**
 * Created by dmitriy.ryajov on 7/13/14.
 */
define(
    [
        'alicate/components/repeater',
        'alicate/components/component'
    ],
    function (Repeater, Component) {
        'use strict';

        describe('Repeater suite', function () {
            describe('Repeater correctness', function () {
                describe('Repeater correctness', function () {
                    var container;

                    beforeEach(function () {
                        container = new Repeater({
                            id: "test"
                        });
                    });

                    it('Repeater class should exist', function () {
                        expect(Repeater).not.toBeNull();
                    });

                    it('Repeater to have id defined', function () {
                        expect(container.id).toBeDefined();
                    });

                    it('Repeater to have $el defined', function () {
                        expect(container.$el).toBeDefined();
                    });

                    it('Repeater to have model defined', function () {
                        expect(container.model).toBeDefined();
                    });

                    it('Repeater to have visible defined', function () {
                        expect(container.visible).toBeDefined();
                    });

                    it('Repeater to have defaultBehaviors defined', function () {
                        expect(container.defaultBehaviors).toBeDefined();
                    });

                    it('Repeater to have components defined', function () {
                        expect(container.components).toBeDefined();
                    });

                    it('Repeater to have getMarkup defined', function () {
                        expect(typeof container.getMarkup).toBe('function');
                    });

                    it('Repeater to have setVisible defined', function () {
                        expect(typeof container.setVisible).toBe('function');
                    });

                    it('Repeater to have isVisible defined', function () {
                        expect(typeof container.isVisible).toBe('function');
                    });

                    it('Repeater to have bindBehaviors defined', function () {
                        expect(typeof container.bindBehaviors).toBe('function');
                    });

                    it('Repeater to have addBehavior defined', function () {
                        expect(typeof container.addBehavior).toBe('function');
                    });

                    it('Repeater to have setModel defined', function () {
                        expect(typeof container.setModel).toBe('function');
                    });

                    it('Repeater to have getModel defined', function () {
                        expect(typeof container.getModel).toBe('function');
                    });

                    it('Repeater to have render defined', function () {
                        expect(typeof container.render).toBe('function');
                    });

                    it('Repeater to have bindModel defined', function () {
                        expect(typeof container.bindModel).toBe('function');
                    });

                    it('Repeater to have add defined', function () {
                        expect(typeof container.add).toBe('function');
                    });

                    it('Repeater to have replace defined', function () {
                        expect(typeof container.replace).toBe('function');
                    });

                    it('Repeater to have get defined', function () {
                        expect(typeof container.get).toBe('function');
                    });

                    it('Repeater to have getChildrenCount defined', function () {
                        expect(typeof container.getChildrenCount).toBe('function');
                    });

                    it('Repeater to have bind defined', function () {
                        expect(typeof container.bind).toBe('function');
                    });

                    it('Repeater to have bindComponent defined', function () {
                        expect(typeof container.bindComponent).toBe('function');
                    });

                    it('Repeater class to throw on missing id', function () {
                        function createCmp() {
                            return new Repeater();
                        };

                        expect(createCmp).toThrow();
                    });
                });

                describe('Repeater visibility', function () {
                    var repeater;

                    beforeEach(function () {
                        var components = {};

                        for (var num in [1, 2, 3]) {
                            components['test' + num] = function () {
                                return new Component({
                                    id: 'test' + num,
                                    $el: $('<div data-aid="test"' + num + '>some text</div>')
                                })
                            };
                        }

                        repeater = new Repeater({
                            id: 'test-container',
                            components: components,
                            $el: $('<div data-aid=test-container></div>'),
                            $parent: $('<div></div>')
                        });

                        repeater.render();
                    });

                    it('Repeater test visible', function () {
                        // let jquery set this element's visibility,
                        // otherwise its going to have no style attached
                        repeater.setVisible(false);
                        repeater.setVisible(true);

                        expect(repeater.isVisible()).toBe(true);
                        expect(repeater.$el.css('display')).toBe('block');
                    });

                    it('Repeater test hidden', function () {
                        repeater.setVisible(false);

                        expect(repeater.isVisible()).toBe(false);
                        expect(repeater.$el.css('display')).toBe('none');
                    });

                    // TODO: Need to figure out what to do with dynamically
                    // created components
//                    it('Repeater test components visible', function () {
//                        repeater.setVisible(true);
//
//                        for (var key in repeater.components) {
//                            var component = repeater.components[key];
//
//                            expect(component.isVisible()).toBe(true);
//                            expect(component.$el.css('display')).toBe('block');
//                        }
//                    });
//
//                    it('Repeater test components hidden', function () {
//                        repeater.setVisible(false);
//
//                        for (var key in repeater.components) {
//                            var component = repeater.components[key];
//
//                            expect(component.isVisible()).toBe(false);
//                            expect(component.$el.css('display')).toBe('none');
//                        }
//                    });
                });

            });
        });

    });
