/**
 * Created by dmitriy.ryajov on 7/13/14.
 */
define(
    [
        'alicate/components/repeater',
        'alicate/components/component',
        'alicate/components/label',
        'alicate/markupiter',
        'alicate/model'
    ],
    function (Repeater, Component, Label, MarkupIter, Model) {
        'use strict';

        describe('Repeater suite', function () {
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
                    expect(container.children).toBeDefined();
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
                    }

                    expect(createCmp).toThrow();
                });
            });

            describe('Repeater visibility', function () {
                var repeater;

                beforeEach(function () {
                    repeater = new Repeater({
                        id: 'test-container',
                        $el: $('<div data-aid=test-container></div>'),
                        $parent: $('<div></div>'),
                        model: [1],
                        onItemRender: function (item) {
                            item.add(new Component({
                                id: 'test',
                                $el: $('<div data-aid="test"' + item.getModelData() + '>some text</div>')
                            }))
                        }
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

                it('Repeater test components visible', function () {
                    repeater.setVisible(true);

                    for (var key in repeater.children) {
                        var component = repeater.children[key];

                        expect(component.isVisible()).toBe(true);
                        expect(component.$el.css('display')).toBe('block');
                    }
                });

                it('Repeater test components hidden', function () {
                    repeater.setVisible(false);

                    for (var key in repeater.children) {
                        var component = repeater.children[key];

                        expect(component.isVisible()).toBe(false);
                        expect(component.$el.css('display')).toBe('none');
                    }
                });
            });

            describe('Repeater test valid markup', function () {
                it('test repeater without children', function () {
                    var $template = $('<div data-aid=\"repeateme\">Hello!!</div>'),
                        repeater = new Repeater({
                            id: 'repeatme',
                            model: [1, 2, 3],
                            $el: $template
                        });

                    repeater.bind(MarkupIter.createMarkupIter($template[0]));
                    repeater.render();

                    expect(repeater.getMarkup())
                        .toBe('<div data-aid="repeateme" style=\"display: block; ">Hello!!</div>' +
                            '<div data-aid="repeateme" style=\"display: block; ">Hello!!</div>' +
                            '<div data-aid="repeateme" style=\"display: block; ">Hello!!</div>');
                });

                it('test repeater with children', function () {
                    var $template = $('<div data-aid="repeateme">' +
                            '<span data-aid="label">[REPLACED WITH \'Hello!\']</span>' +
                            '</div>'),
                        repeater = new Repeater({
                            id: 'repeatme',
                            model: [1, 2, 3],
                            $el: $template,
                            onItemRender: function (item) {
                                item.add(new Label({
                                    id: 'label',
                                    text: 'Hello!'
                                }))
                            }
                        });

                    repeater.bind(MarkupIter.createMarkupIter($template[0]));
                    repeater.render();

                    expect(repeater.getMarkup())
                        .toBe('<div data-aid="repeateme" style="display: block; "><span data-aid="label" style="display: inline; ">Hello!</span></div>' +
                            '<div data-aid="repeateme" style="display: block; "><span data-aid="label" style="display: inline; ">Hello!</span></div>' +
                            '<div data-aid="repeateme" style="display: block; "><span data-aid="label" style="display: inline; ">Hello!</span></div>');
                });

                it('Repeater test nested repeater', function () {
                    var $template = $('<div data-aid="repeater1">' +
                            '<div data-aid="data1"></div>' +
                            '<div data-aid="repeater2">' +
                            '<div data-aid="data2"></div>' +
                            '</div></div>'),
                        repeater = new Repeater({
                            id: 'repeater1',
                            $el: $template,
                            model: new Model({data: [1]}),
                            onItemRender: function (item) {
                                item.add(new Label({
                                    id: 'data1',
                                    text: 'some data'
                                })).add(new Repeater({
                                    id: 'repeater2',
                                    model: new Model({data: [1]}),
                                    onItemRender: function (item) {
                                        item.add(new Label({
                                            id: 'data2',
                                            text: 'some more text'
                                        }))
                                    }
                                }));
                            }
                        });

                    repeater.bind(MarkupIter.createMarkupIter($template[0]));
                    repeater.render();

                    expect(repeater.getMarkup())
                        .toBe('<div data-aid="repeater1" style="display: block; ">' +
                            '<div data-aid="repeater2" style="display: block; ">' +
                            '<div data-aid="data2" style="display: block; ">some more text</div>' +
                            '</div>' +
                            '</div>');
                });
            });

            describe('Repeater test valid model', function () {
                it('test repeater valid model', function () {
                    var $template = $('<div data-aid="repeateme">Hello!!</div>'),
                        repeater = new Repeater({
                            id: 'repeatme',
                            model: [1, 2, 3],
                            $el: $template
                        });

                    repeater.bind(MarkupIter.createMarkupIter($template[0]));
                    expect(function () {
                        repeater.render()
                    }).not.toThrow('Model should return an Array or Object!');
                });

                it('test repeater invalid model', function () {
                    var $template = $('<div data-aid="repeateme">Hello!!</div>'),
                        repeater = new Repeater({
                            id: 'repeatme',
                            model: 'lol', // invalid model
                            $el: $template
                        });

                    repeater.bind(MarkupIter.createMarkupIter($template[0]));
                    expect(function () {
                        repeater.render()
                    }).toThrow('Model should return an Array!');
                });
            });
        });
    });
