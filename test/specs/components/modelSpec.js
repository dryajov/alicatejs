/**
 * Created by dmitriy.ryajov on 7/10/14.
 */

var Model = require('alicate/model');

function modelSpec() {
    'use strict';

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
};
