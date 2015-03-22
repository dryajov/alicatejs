/**
 * Created by dmitriy.ryajov on 7/8/14.
 */
var Label = require('alicate/components/label');

function labelSpec() {
    'use strict';

    describe('Label suite', function () {

        describe('Label correctness', function () {
            var label;

            beforeEach(function () {
                label = new Label({
                    id: "test"
                });
            });

            it('Label class should exist', function () {
                expect(Label).not.toBeNull();
            });

            it('Label to have id defined', function () {
                expect(label.id).toBeDefined();
            });

            it('Label to have $el defined', function () {
                expect(label.$el).toBeDefined();
            });

            it('Label to have model defined', function () {
                expect(label.model).toBeDefined();
            });

            it('Label to have visible defined', function () {
                expect(label.visible).toBeDefined();
            });

            it('Label to have defaultBehaviors defined', function () {
                expect(label.defaultBehaviors).toBeDefined();
            });

            it('Label to have text defined', function () {
                expect(label.text).toBeDefined();
            });

            it('Label to have getMarkup defined', function () {
                expect(typeof label.getMarkup).toBe('function');
            });

            it('Label to have setVisible defined', function () {
                expect(typeof label.setVisible).toBe('function');
            });

            it('Label to have isVisible defined', function () {
                expect(typeof label.isVisible).toBe('function');
            });

            it('Label to have bindBehaviors defined', function () {
                expect(typeof label.bindBehaviors).toBe('function');
            });

            it('Label to have addBehavior defined', function () {
                expect(typeof label.addBehavior).toBe('function');
            });

            it('Label to have setModel defined', function () {
                expect(typeof label.setModel).toBe('function');
            });

            it('Label to have getModel defined', function () {
                expect(typeof label.getModel).toBe('function');
            });

            it('Label to have render defined', function () {
                expect(typeof label.render).toBe('function');
            });

            it('Label to have bindModel defined', function () {
                expect(typeof label.bindModel).toBe('function');
            });

            it('Label class to throw on missing id', function () {
                function createCmp() {
                    return new Label();
                };

                expect(createCmp).toThrow();
            });
        });

        describe('Label rendering', function () {
            it('Label to render "Hello World!"', function () {
                var label = new Label({
                    id: 'label',
                    text: 'Hello World!',
                    $el: $('<div data-aid="label">[SOME TEXT]</div>')
                });

                label.render();
                expect(label.getValue()).toBe('Hello World!');
            });

            it('Label to render Hello "World from alicate!"', function () {
                var label = new Label({
                    id: 'label',
                    text: 'Hello World from {name}!',
                    model: {name: 'alicate'},
                    $el: $('<div data-aid="label">[SOME TEXT]</div>')
                });

                label.render();
                expect(label.getValue()).toBe('Hello World from alicate!');
            });
        });
    });
};
