Single page, component oriented javascript framework that aims at eliminating logic in the templates.

[![Build Status](https://travis-ci.org/dryajov/alicatejs.svg?branch=master)](https://travis-ci.org/dryajov/alicatejs)
[![Join the chat at https://gitter.im/dryajov/alicatejs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dryajov/alicatejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![alicatejs](https://raw.githubusercontent.com/dryajov/alicatejs/master/logo.jpg)

### Getting started
To install alicatejs do `npm install --save alicatejs`.

### Resources
* [Wiki](https://github.com/dryajov/alicatejs/wiki)
* [Reference](http://alicatejs.org/docs/index.html)
* [Examples repository](https://github.com/dryajov/alicatejs_samples)
* [TodoMVC implemented in alicatejs](https://github.com/dryajov/todomvc-app-alicatejs)
* [Check out TodoMVC in the browser](https://dryajov.github.io/todomvc-app-alicatejs/index.html)

### Motivation
With the advent of new and evermore complex javascript frameworks, we've seen an explosion of templating engines. I believe
that templates are a simplistic solution to a complex problem, and it introduces more problems that it solves.

Some problems with templates are:

- Foreign syntax.
    - Doesn't integrate well with existing target language and as such is not easily debuggable
- It's the wrong level of abstraction.
    - With some templates featuring a complete set of branching statements,
      your view logic ends up spilled all over the place, making it difficult to
      follow and maintain
- It's inherently insecure.
	- All templating engines allow some level of arbitrary expression execution, which could rely on something like `eval`, or have a built in parser for such evaluations. Each approach presents varying levels of security risks, however they all require some level of manual sanitation of the expressions, which is error prone and requires the dev team to stay on top of reported security vulnerabilities with frequent updates and patches.

### How does alicatejs solve this problems?

With alicatejs, all the logic from the template is gone. This is accomplished by attaching behaviors to HTML elements
and controlling the rendering of the elements from the code. This is in turn accomplished by marking some of the desired elements with
the `data-aid` attribute that the framework picks up and makes available in the code as alicatejs components. The components are sufficiently
abstract as to be able to attach to a range of similar HTML elements, and at the same time sufficiently concrete as to
not to allow creating invalid markup.

### Core concepts

##### View

A `View` represents an alicate `Component` that has an unparsed html fragment (logicless template) associated. The `View` initiates the rendering of the components tree.

##### Container

A `Container` is basically a `Component` that is able to hold a colection of other components (including another container such as a `View`, `Container` or `Repeater`). It is possible to add components to it by directly adding them to the `children` array or to by using the `add` method on an existing instance.

##### Component

A `Component` is the building block of the framework, it is a class extended by the rest of the components in the framework. There are a range of components that will attach to a subset of similar html elements.

These components are:

* Label
* Input
* Repeater
* Button
* Image
* Select

##### Model

A `Model` is consumed by components, it provides an interface to interact with external data, it has a `data` property and `get` and `set` methods that access the underlying `data`. `Model`s are two way bound, a change in the model's `data` will trigger an update of the associated `Component` (you have to use the `set` method),  and a change on an __updateble__ html element that the component is associated with, will update the underlying `data` (and all the registered subscribers). It is, what in some other frameworks is considered a **View Model**.

##### Html Fragment (logicless template)

An html fragment is any html element that is marked with the `data-aid` attribute, this attribute is used by the framework to bind components to the corresponding html elements. Html fragments are compiled into a template store. A template store is a hash object with the key being the template name, and the value, the html fragment to be rendered.

### Hello World in Alicatejs

##### helloworld.js
```javascript
    var Alicate = require('alicatejs'),
        Container = Alicate.Container,
        Label = Alicate.Label,
        Button = Alicate.Button,
        Select = Alicate.Select;

        var templateStore = {};
        templateStore['helloworld.html'] = '<div data-aid="hello">[THIS WILL BE REPLACED]</div>';
        var app = new AlicateApp({
            templateStore: templateStore,
            selector: '#myapp',
            index: '/helloworld'
        });

        app.mount('/helloworld', new View({
                templateName: 'helloworld.html',
                children: {
                    hello: new Label({
                        id: 'hello',
                        text: 'Hello World from Alicate!!'
                        })
                }
            })).start();

```
The snippet above demonstrates the core concepts of alicate in action.

An application that will attach it self to the `#myapp` selector, is constructed, using `/helloworld` path as its index page/location. Once we have an application, we can start `mount`ing our views on a desired path, this will allow alicatejs to render the view when the browser navigates to that path. Next a `Label` component is added as a child of the `View`. The `Label` will render the contents of its `text` property to the associated html element.

### DI integration

Currently alicatejs provides DI through [opium-ioc](https://github.com/dryajov/opium). In order to inject dependencies into your alicatejs components and views, a special array property is used - `$inject`. Any string listed in the `$inject` array will be interpreted as a dependency name, will be looked up in `opiums-ioc` registry and subsequently assigned to an existing property in your component. `opium-ioc` expects the property to be defined, otherwise no injection will be performed.

```javascript
    var view;
    module.exports = Alicate.View.extend({
        templateName: 'app/scripts/ui/import-view/import-view.html',
        $inject: ['connectors'],
        connectors: null,
        children: [
            providersList
        ],
        initialize: function initialize() {
            view = this;
        },
        onEnter: function () {
            Alicate.View.prototype.onEnter.call(this);

            this.connectors.init().done(function (connectors) {
                providerListModel.set([]);
                providerListModel.set(connectors);
            });
        }
    });
```

In the above snippet, `connectors` will be injected into the view.

Injection happens in two places, the first time a component is `bound` and on each subsequent `onEnter` invocations. 
