/**
 * Created by dmitriy.ryajov on 7/9/14.
 */

'use strict';

var Component = require('../../../app/scripts/alicate/components/component'),
    Model = require('../../../app/scripts/alicate/model'),
    $ = require('jquery');

describe('Component suite', function () {
    describe('Component correctness', function () {
        var component;

        beforeEach(function () {
            component = new Component({
                id: "test"
            });
        });

        it('Component class should exist', function () {
            expect(Component).not.toBeNull();
        });

        it('Component to have id defined', function () {
            expect(component.id).toBeDefined();
        });

        it('Component to have $el defined', function () {
            expect(component.$el).toBeDefined();
        });

        it('Component to have model defined', function () {
            expect(component.model).toBeDefined();
        });

        it('Component to have visible defined', function () {
            expect(component.visible).toBeDefined();
        });

        it('Component to have defaultBehaviors defined', function () {
            expect(component.defaultBehaviors).toBeDefined();
        });

        it('Component to have getMarkup defined', function () {
            expect(typeof component.getMarkup).toBe('function');
        });

        it('Component to have setVisible defined', function () {
            expect(typeof component.setVisible).toBe('function');
        });

        it('Component to have isVisible defined', function () {
            expect(typeof component.isVisible).toBe('function');
        });

        it('Component to have bindBehaviors defined', function () {
            expect(typeof component.bindBehaviors).toBe('function');
        });

        it('Component to have addBehavior defined', function () {
            expect(typeof component.addBehavior).toBe('function');
        });

        it('Component to have setModel defined', function () {
            expect(typeof component.setModel).toBe('function');
        });

        it('Component to have getModel defined', function () {
            expect(typeof component.getModel).toBe('function');
        });

        it('Component to have render defined', function () {
            expect(typeof component.render).toBe('function');
        });

        it('Component to have bindModel defined', function () {
            expect(typeof component.bindModel).toBe('function');
        });

        it('Component class to throw on missing id', function () {
            function createCmp() {
                return new Component();
            }

            expect(createCmp).toThrow();
        });
    });

    describe('Component visibility', function () {
        var component;

        beforeEach(function () {
            component = new Component({
                id: 'test'
            });
            component.$el = $('<div data-aid="test">I\'m visible</div>');
        });

        it('Component test visible', function () {
            // let jquery set this element's visibility,
            // otherwise its going to have no style attached
            component.setVisible(false);
            component.setVisible(true);

            expect(component.isVisible()).toBe(true);
            expect(component.$el.css('display')).toBe('block');
        });

        it('Component test hidden', function () {
            component.setVisible(false);

            expect(component.isVisible()).toBe(false);
            expect(component.$el.css('display')).toBe('none');
        });
    });

    describe('Component simple value Model', function () {
        var component;

        beforeEach(function () {
            component = new Component({
                id: 'test',
                model: {key: 'val'}
            });
        });

        it('Component get model', function () {
            expect(component.getModel()).toEqual({key: 'val'});
        });

        it('Component set model', function () {
            component.setModel({key: 'diff-val'});
            expect(component.getModel()).toEqual({key: 'diff-val'});
        });

        it('Component get model data', function () {
            component.setModel({key: 'val'});
            expect(component.getModelData()).toEqual({key: 'val'});
        });
    });

    describe('Component Model', function () {
        var component, model;

        beforeEach(function () {
            model = new Model({
                data: {key: 'val'}
            });
            component = new Component({
                id: 'test',
                model: model
            });
        });

        it('Component get model', function () {
            expect(component.getModel()).toEqual(model);
        });

        it('Component set model', function () {
            component.setModel(new Model({
                data: {key: 'diff-val'}
            }));
            expect(component.getModel()).not.toEqual(model);
        });

        it('Component get model data', function () {
            expect(component.getModelData()).toEqual({key: 'val'});
        });

        it('Component bind model', function () {
            spyOn(component, 'bindModel');

            component.setModel({key: 'val'});
            expect(component.bindModel).toHaveBeenCalled();
        });
    });
});
