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
and controlling the execution flow from the code. This is in turn accomplished by marking some of the desired elements with
the `data-aid` attribute that alicatejs picks up and makes available in the code as alicatejs components. The components are sufficiently
abstract as to be able to attach to a range of similar HTML elements, and at the same time sufficiently concrete as to
not to allow creating invalid markup. 

####Core concepts

#####View
A `View` represents an alicate `Component` that has an unparsed html fragment (logicless template) associated. The `View` initiates the rendering of the components tree.

#####Component
A `Component` is the building block of the framework, it is the abstract class extended by the rest of the components in the framework. 

#####Model
A `Model` is consumed by components in the framework, it provides an interface to interact with external data. A `Model` has a `data` property and `get` and `set` method that access the underlying `data`. `Models` are two way bound, a change in the model `data` will trigger an update of the associated `Component` (you have to use the `set` method),  and a change on an **updateble** html element that the component is associated with, will update the underlying `data`. It is, what in some other frameworks is considered a **View Model**.

#####Html Fragment (logicless template)
An html fragment is any html element that is marked with the `data-aid` attribute, this attribute is used by the framework to bind components to the corresponding html elements.
