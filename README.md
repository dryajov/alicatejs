####NOTE: This is in early alpha stage, not production ready!!!

##What is alicatejs?
![alicatejs](logo.jpg?raw)


Alicatejs is a single page, MVC, component oriented javascript framework that aims at eliminating logic in the templates.

###Motivation
With the advent of new and evermore complex javascript frameworks, we've seen an explosion of templating engines. I believe
that templates are a simplistic solution to a complex problem, and it introduces more problems that it solves.

Some problems with templates are:

- Foreign syntax.
    - Doesn't integrate well with existing target language and as such is not easily debuggable
- It's the wrong level of abstraction.
    - With some templates featuring a complete set of branching statements,
      your view logic ends up spilled all over the place, making it difficult to
      follow and maintain

###How does alicatejs solve this problems?

With alicatejs, all the logic from the template is gone. This is accomplished by attaching behaviors to HTML elements
and controlling the rendering of the elements from the code. This is in turn accomplished by marking some of the desired elements with
the `data-aid` attribute that the framework picks up and makes available in the code as alicatejs components. The components are sufficiently
abstract as to be able to attach to a range of similar HTML elements, and at the same time sufficiently concrete as to
not to allow creating invalid markup.

###Core concepts

#####View

A `View` represents an alicate `Component` that has an unparsed html fragment (logicless template) associated. The `View` initiates the rendering of the components tree.

#####Component

A `Component` is the building block of the framework, it is the abstract class extended by the rest of the components in the framework. There are a range of components that will attach to a subset of similar html elements.

These components are:

* Label
* Input
* Repeater
* Button
* Image
* Select

#####Model

A `Model` is consumed by components, it provides an interface to interact with external data, it has a `data` property and `get` and `set` methods that access the underlying `data`. `Model`s are two way bound, a change in the model's `data` will trigger an update of the associated `Component` (you have to use the `set` method),  and a change on an __updateble__ html element that the component is associated with, will update the underlying `data` (and all the registered subscribers). It is, what in some other frameworks is considered a **View Model**.

#####Html Fragment (logicless template)

An html fragment is any html element that is marked with the `data-aid` attribute, this attribute is used by the framework to bind components to the corresponding html elements. Html fragments are compiled int a template store. A template store is a hash object with the key being the template name, and the value, the html fragment to be rendered.

There is a grunt plugin (_grunt-template-store_) available that will aid with the generation of the template store.

###Hello World in Alicatejs

#####helloworld.html
```
    <div data-aid="hello">[THIS WILL BE REPLACED]</div>
```

#####helloworld.js
```
    var $ = require('jquery'),
        Alicate = require('alicatejs'),
        Container = Alicate.Container,
        Label = Alicate.Label,
        Button = Alicate.Button,
        Select = Alicate.Select;
    
    module.exports = View.extends({
        templateName: 'helloworld.html',
        children: [
            new Label({
                id: 'hello',
                text: 'Hello World from Alicate!!'
            })
        ]
    });

```
The snippet above demonstrates the core concepts of alicate in action.

An application that will attach itself to the `#myapp` selector, is constructed, using `/helloworld` path as its index page/location. Once we have an application, we can start `mount`ing our views on a desired path, this will allow alicatejs to render the view when the browser navigates to that path. Next a `Label` component is added as a child of the `View`. The `Label` will render the contents of its `text` property to the associated html element.

###Why jQuery?
jQuery allows to interact with the DOM without worrying about browser specific quirks, and due to its popularity chances are that it's already deployed to the end user site.

