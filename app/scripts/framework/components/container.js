/**
 * Created by dmitriy.ryajov on 6/30/14.
 */
define(
    [
        'framework/components/component'
    ],
    function (component) {
        'use strict';

        return component.extend({
            initialize: function () {
                component.prototype.initialize.call(this);

                if (!this.components) {
                    this.components = {};
                }
            },
            /**
             * The template markup from the template store
             *
             * @type {jQuery}
             */
            $_templateMarkup: null,
            getMarkup: function () {
                return this.$_templateMarkup;
            },
            /**
             * List of components that have been attached to this view.
             * This will be populated by the framework if it was not provided
             * when the view is being defined.
             *
             * @property _components
             * @type {Object}
             */
            components: null,
            /**
             * Add a component to the view. Components that are not added explicitly
             * are still going to be added by the framework, and their model will be constructed
             * from the view model if one is provided.
             *
             * @method add
             * @param cpm
             * @return this
             */
            add: function (cpm, id) {
                this.components[cpm.id || id] = cpm;
                return this;
            },
            replace: function (cpm, id) {
                this.add(cpm, id);
            },
            /**
             * Get a component by id
             *
             * @param id
             * @returns {component}
             */
            get: function (id) {
                return this.components[id];
            },
            hasChildren: function () {
                return Object.keys(this.components).length;
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            bind: function ($markup) {
                var DATA_ATTR = '[data-eid]',
                    context = [];

                context.push(this);
                function processElm() {
                    var id, curComponent,
                        that = context.slice(-1)[0]; // peek the last elm on the stack;

                    id = $(this).data().eid;
                    while (that && !(curComponent = that.get(id))) {
                        that = context.pop();
                    }

                    if (!that || !curComponent) {
                        throw 'Something\'s wrong, could not find component with ID ' + id;
                    }

                    // if this is a function then call it,
                    // it should construct a component
                    if (typeof curComponent === 'function') {
                        curComponent = curComponent();
                        that.replace(curComponent);
                    }

                    curComponent.$el = $(this);
                    // bind the model associated with this component
                    if (curComponent.model) {
                        curComponent.bindModel();
                    }

                    curComponent.onBind();

                    if (curComponent.hasChildren &&
                        curComponent.hasChildren()) {
                        context.push(curComponent);
                    }
                };

                $markup.find(DATA_ATTR).each(processElm);
            },
            /**
             * Scan the template and attach components to html elements
             *
             * @return {void}
             */
            _process: function () {
                this.$_templateMarkup = $('<div/>').append(this.template);
                this.bind(this.$_templateMarkup);
            },
            /**
             * Render the component tree
             *
             * @method render
             */
            render: function () {
                var component;

                this._process();

                // run through the list of components and render them
                for (var key in this.components) {
                    component = this.components[key];

                    component.onBeforeRender();
                    component.render();
                    component.attachBehaviors();
                    component.onAfterRender();
                }
            }
        });
    });
