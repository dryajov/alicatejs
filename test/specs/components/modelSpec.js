/**
 * Created by dmitriy.ryajov on 7/10/14.
 */

'use strict';

var Model = require('../../../app/scripts/alicate/model'),
    $ = require('jquery');

describe('Model Suite', function () {
    describe('Model get/set', function () {
        var model;

        beforeEach(function () {
            model = new Model({
                data: {key: 'val'}
            });
        });

        it('Model get', function () {
            expect(model.get()).toEqual({key: 'val'});
        });

        it('Model set', function () {
            spyOn(model, 'update').and.callThrough();
            model.set({key: 'new-val'});
            expect(model.get()).toEqual({key: 'new-val'});
            expect(model.update).toHaveBeenCalled();
        });
    });
});
