/**
 * Created by dmitriy.ryajov on 7/8/14.
 */

'use strict';

var Button = require('../../../app/scripts/alicate/components/button'),
    Model = require('../../../app/scripts/alicate/model'),
    $ = require('jquery');

describe('Button suite', function () {

    describe('Button correctness', function () {
        var button;

        beforeEach(function () {
            button = new Button({
                id: "test"
            });
        });

        it('Button class should exist', function () {
            expect(Button).not.toBeNull();
        });

        it('Button to have id defined', function () {
            expect(button.id).toBeDefined();
        });

        it('Button to have $el defined', function () {
            expect(button.$el).toBeDefined();
        });

        it('Button to have model defined', function () {
            expect(button.model).toBeDefined();
        });

        it('Button to have visible defined', function () {
            expect(button.visible).toBeDefined();
        });

        it('Button to have defaultBehaviors defined', function () {
            expect(button.defaultBehaviors).toBeDefined();
        });

        it('Button to have getMarkup defined', function () {
            expect(typeof button.getMarkup).toBe('function');
        });

        it('Button to have setVisible defined', function () {
            expect(typeof button.setVisible).toBe('function');
        });

        it('Button to have isVisible defined', function () {
            expect(typeof button.isVisible).toBe('function');
        });

        it('Button to have bindBehaviors defined', function () {
            expect(typeof button.bindBehaviors).toBe('function');
        });

        it('Button to have addBehavior defined', function () {
            expect(typeof button.addBehavior).toBe('function');
        });

        it('Button to have setModel defined', function () {
            expect(typeof button.setModel).toBe('function');
        });

        it('Button to have getModel defined', function () {
            expect(typeof button.getModel).toBe('function');
        });

        it('Button to have render defined', function () {
            expect(typeof button.render).toBe('function');
        });

        it('Button to have bindModel defined', function () {
            expect(typeof button.bindModel).toBe('function');
        });

        it('Button to have setEnabled defined', function () {
            expect(typeof button.setEnabled).toBe('function');
        });

        it('Button class to throw on missing id', function () {
            function createCmp() {
                return new Button();
            }

            expect(createCmp).toThrow();
        });
    });

    describe('Button rendering', function () {
        var model, button;

        beforeEach(function () {
            model = new Model({
                data: 'Hello im a button!'
            });

            button = new Button({
                id: 'Button',
                model: model,
                $el: $('<button data-aid="Button">')
            });

            button.bind();
            button.bindModel();
            button.render();
        });

        it('Button to render "Hello im a button!"', function () {
            expect(button.getValue()).toBe('Hello im a button!');
        });

        it('Button to render "Hello im a button from alicate!"', function () {
            model.set('Hello im a button from alicate!');
            expect(button.getValue()).toBe('Hello im a button from alicate!');
        });

    });
});
