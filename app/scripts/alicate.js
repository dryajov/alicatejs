'use strict';

var Alicatejs = {};

Alicatejs.Observable = require('./alicate/observable');
Alicatejs.Model = require('./alicate/model');
Alicatejs.Markupiter = require('./alicate/base');
Alicatejs.AlicateApp = require('./alicate/alicateapp');
Alicatejs.View = require('./alicate/components/view');
Alicatejs.Select = require('./alicate/components/select');
Alicatejs.Repeater = require('./alicate/components/repeater');
Alicatejs.Label = require('./alicate/components/label');
Alicatejs.Input = require('./alicate/components/input');
Alicatejs.Image = require('./alicate/components/image');
Alicatejs.Anchor = require('./alicate/components/anchor');
Alicatejs.Container = require('./alicate/components/container');
Alicatejs.Component = require('./alicate/components/component');
Alicatejs.Button = require('./alicate/components/button');
Alicatejs.Behavior = require('./alicate/behaviors/behavior');
Alicatejs.Eventable = require('./alicate/behaviors/eventable');
Alicatejs.Base = require('./alicate/base');
Alicatejs.StackedContainer = require('./alicate/components/stacked-container');

module.exports = Alicatejs;
