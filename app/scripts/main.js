window.Alicatejs = window.Alicatejs || {};
if (typeof Alicatejs.version === 'function' &&
    Alicatejs.version !== require('../../package.json').version) {
    var console = require('console');
    console.warn('Another version (' + Alicatejs.version + ') of alicatejs has been already loaded on this page!');
} else {
    exports.Router = Alicatejs.Router = require('./alicate/router');
    exports.Observable = Alicatejs.Observable = require('./alicate/observable');
    exports.Model = Alicatejs.Model = require('./alicate/model');
    exports.Markupiter = Alicatejs.Base = require('./alicate/base');
    exports.AlicateApp = Alicatejs.AlicateApp = require('./alicate/alicateapp');
    exports.View = Alicatejs.View = require('./alicate/components/view');
    exports.Select = Alicatejs.Select = require('./alicate/components/select');
    exports.Repeater = Alicatejs.Repeater = require('./alicate/components/repeater');
    exports.Label = Alicatejs.Label = require('./alicate/components/label');
    exports.Input = Alicatejs.Input = require('./alicate/components/input');
    exports.Image = Alicatejs.Image = require('./alicate/components/image');
    exports.Container = Alicatejs.Container = require('./alicate/components/container');
    exports.Component = Alicatejs.Component = require('./alicate/components/component');
    exports.Button = Alicatejs.Button = require('./alicate/components/button');
    exports.Behavior = Alicatejs.Behavior = require('./alicate/behaviors/behavior');
    exports.Eventable = Alicatejs.Eventable = require('./alicate/behaviors/eventable');
}

