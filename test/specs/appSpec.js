/**
 * Created by dmitriy.ryajov on 12/21/15.
 */

var Alicate = require('../../app/scripts/alicate');
var $ = require('jquery');

describe('App suite', function () {

    describe('View rendering', function () {
        var $templateStore = {}, app;

        beforeAll(function () {
            $('<div id="test-app">[VIEW SHOULD RENDER HERE]</div>').appendTo('body');
        });

        beforeEach(function () {
            $templateStore['templateView1'] = '<div>This is view #1</div>';
            $templateStore['templateView2'] = '<div>This is view #2</div>';

            app = new Alicate.AlicateApp({
                templateStore: $templateStore,
                $selector: '#test-app',
                index: 'my-view2'
            });
        });

        it('should render view', function () {
            app.add(new Alicate.View({
                id: 'my-view1',
                templateName: 'templateView1'
            }));

            app.add(new Alicate.View({
                id: 'my-view2',
                templateName: 'templateView2'
            }));

            app.start('my-view1');
            expect(app.$el.html()).toBe($($templateStore['templateView1']).prop('outerHTML'));
        });

        it('should render switch views', function () {
            app.add(new Alicate.View({
                id: 'my-view1',
                templateName: 'templateView1'
            }));

            app.add(new Alicate.View({
                id: 'my-view2',
                templateName: 'templateView2'
            }));

            app.start('my-view1');
            expect(app.$el.html()).toBe($($templateStore['templateView1']).prop('outerHTML'));
            app.setActive('my-view2');
            expect(app.$el.html()).toBe($($templateStore['templateView2']).prop('outerHTML'));
        });

        it('should render index view', function () {
            app.add(new Alicate.View({
                id: 'my-view1',
                templateName: 'templateView1'
            }));

            app.add(new Alicate.View({
                id: 'my-view2',
                templateName: 'templateView2'
            }));

            app.start();
            expect(app.$el.html()).toBe($($templateStore['templateView2']).prop('outerHTML'));
        });
        
        it('events should trigger', function () {
            app.add(new Alicate.View({
                id: 'my-view1',
                templateName: 'templateView1'
            }));

            app.add(new Alicate.View({
                id: 'my-view2',
                templateName: 'templateView2'
            }));

            spyOn(app, 'emit');

            app.start();
            expect(app.emit).toHaveBeenCalledWith('starting');
            expect(app.emit).toHaveBeenCalledWith('started');

            app.stop();
            expect(app.emit).toHaveBeenCalledWith('stopping');
            expect(app.emit).toHaveBeenCalledWith('stopped');
        });
    });
});
