/**
 * Created by dmitriy.ryajov on 7/8/14.
 */

'use strict';

var Input = require('../../app/scripts/alicate/components/input'),
    Model = require('../../app/scripts/alicate/model'),
    $ = require('jquery');

describe('Input suite', function () {

    describe('Input correctness', function () {
        var input;

        beforeEach(function () {
            input = new Input({
                id: "test"
            });
        });

        it('Input class should exist', function () {
            expect(Input).not.toBeNull();
        });

        it('Input to have id defined', function () {
            expect(input.id).toBeDefined();
        });

        it('Input to have $el defined', function () {
            expect(input.$el).toBeDefined();
        });

        it('Input to have model defined', function () {
            expect(input.model).toBeDefined();
        });

        it('Input to have visible defined', function () {
            expect(input.visible).toBeDefined();
        });

        it('Input to have defaultBehaviors defined', function () {
            expect(input.defaultBehaviors).toBeDefined();
        });

        it('Input to have getMarkup defined', function () {
            expect(typeof input.getMarkup).toBe('function');
        });

        it('Input to have setVisible defined', function () {
            expect(typeof input.setVisible).toBe('function');
        });

        it('Input to have isVisible defined', function () {
            expect(typeof input.isVisible).toBe('function');
        });

        it('Input to have bindBehaviors defined', function () {
            expect(typeof input.bindBehaviors).toBe('function');
        });

        it('Input to have addBehavior defined', function () {
            expect(typeof input.addBehavior).toBe('function');
        });

        it('Input to have setModel defined', function () {
            expect(typeof input.setModel).toBe('function');
        });

        it('Input to have getModel defined', function () {
            expect(typeof input.getModel).toBe('function');
        });

        it('Input to have render defined', function () {
            expect(typeof input.render).toBe('function');
        });

        it('Input to have bindModel defined', function () {
            expect(typeof input.bindModel).toBe('function');
        });

        it('Input class to throw on missing id', function () {
            function createCmp() {
                return new Input();
            }

            expect(createCmp).toThrow();
        });
    });

    describe('Input rendering', function () {
        var model, input;

        beforeEach(function () {
            model = new Model({
                data: 'Hello World!'
            });

            input = new Input({
                id: 'input',
                model: model,
                $el: $('<input type="text" data-aid="input">')
            });

            input.bind();
            input.bindModel();
            input.render();
        });

        it('Input to render "Hello World!"', function () {
            expect(input.getValue()).toBe('Hello World!');
        });

        it('Input to render "Hello World from alicate!"', function () {
            model.set('Hello World from alicate!');
            expect(input.getValue()).toBe('Hello World from alicate!');
        });


    });
});
