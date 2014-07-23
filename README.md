**What is alicatejs?**

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

*How does alicatejs solve this problems?*

With alicatejs, all the logic from the template is gone. This is accomplished by attaching behaviors to HTML elements
and controlling the execution flow from the code. This is in turn accomplished by marking some of the desired elements with
the `data-aid` attribute that alicatejs picks up and makes available in the code as alicatejs components. The components are sufficiently
abstract as to be able to attach to a range of similar HTML elements, and at the same time sufficiently concrete as to
not to allow creating invalid markup. 

