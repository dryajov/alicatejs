What is alicatejs?

Alicatejs is an MVC, component oriented javascript framework that aims at eliminating logic in the templates.
With the advent of new and evermore complex javascript frameworks, we've seen an explosion of templating engines. I believe
that templates are a simplistic solution to a complex problem, and it introduces more problems that it solves.

Some problems with templating are:
- Foreign syntax.
    - Doesn't integrate well with existing target language and as such is not easily debuggable
- It's the wrong level of abstraction.
    - With some templates featuring a complete set of branching statements,
      your view logic ends up spilled all over the place, in the template itself and the code, making it difficult to
      follow and troubleshoot


How does alicatejs solve this problems?

With alicatejs, all the logic from the template is gone. This is accomplished by attaching behaviors to HTML elements
and controlling the execution flow from javascript. This is in turn accomplished by marking some of the desired elements with
identifiers that alicatejs picks up and makes available in the code as alicatejs components. This components are sufficiently
abstract as to be able to attach to a range of similar HTML elements, and at the same time sufficiently concrete as to
not to allow creating invalid markup. 

The concept of componetizing arbitrary HTML elements is not new, other frameworks such as Apache Wicket (java), have done
similar things in the past, the thing that sets alicatejs apart from Apache Wicket (for example), is that it does not impose any sort of
hierarchical structure on your component tree in the code, but instead pre-creates those components and makes them available
to the view that is being rendered. The behavior of the component can still be modified in place, at the time the component is
being attached to the view, or at the time of rendering it's markup to into the view.

