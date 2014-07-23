##What is alicatejs?

Alicatejs is an MVC, component oriented javascript framework that aims at eliminating logic in the templates.
With the advent of new and evermore complex javascript frameworks, we've seen an explosion of templating engines. I believe
that templates are a simplistic solution to a complex problem, and it introduces more problems that it solves.

Some problems with templating are:
- Foreign syntax.
    - Doesn't integrate well with existing target language and as such is not easily debuggable
- It's the wrong level of abstraction.
    - With some templates featuring a complete set of branching statements,
      your view logic ends up spilled all over the place, making it difficult to
      follow and troubleshoot

###How does alicatejs solve this problems?

With alicatejs, all the logic from the template is gone. This is accomplished by attaching behaviors to HTML elements
and controlling the rendering of the elements from the code. This is in turn accomplished by marking some of the desired elements with
the `data-aid` attribute that the framework picks up and makes available in the code as alicatejs components. The components are sufficiently
abstract as to be able to attach to a range of similar HTML elements, and at the same time sufficiently concrete as to
not to allow creating invalid markup.

####Core concepts

#####View

* A `View` represents an alicate `Component` that has an unparsed html fragment (logicless template) associated. The `View` initiates the rendering of the components tree.

#####Component

* A `Component` is the building block of the framework, it is the abstract class extended by the rest of the components in the framework.

#####Model

* A `Model` is consumed by the components, it provides an interface to interact with external data. A `Model` has a `data` property and `get` and `set` methods that access the underlying `data`. `Models` are two way bound, a change in the model `data` will trigger an update of the associated `Component` (you have to use the `set` method),  and a change on an __updateble__ html element that the component is associated with, will update the underlying `data` (and all the registered subscribers). It is, what in some other frameworks is considered a **View Model**.

#####Html Fragment (logicless template)

* An html fragment is any html element that is marked with the `data-aid` attribute, this attribute is used by the framework to bind components to the corresponding html elements. Html fragments are compiled int a template store. A template store is just a hash object with the key being the template name and the value, the html fragment to be rendered. There is a grunt plugin (grunt-template-store) available that will construct a template store.

#####Hello World in Alicatejs

```
var templateStore = {'helloworld.html': '<div data-aid="hello">[THIS WILL BE REPLACED]</div>'},
app = new AlicateApp({
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
The program above demonstrates the core concepts of alicate in action.

An application is constructed, that will attach itself to the `#myapp` selector, with the `/helloworld` path as its index. Once we have an application, we can start mounting our views on a desired path, this will cause alicatejs to render the view when the browser navigates to that path. This view has one child, a `Label` component, that renders the contents of its _text_ property of its `text` property to the associated html element.  
