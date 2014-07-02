/**
 * Created by dmitriy.ryajov on 7/1/14.
 */
define(
    [
        'framework/components/component'
    ],
    function(component){
        'use strict';

        return component.extend({
            render: function() {
                // TODO: Verify that we're rendering into a
                // valid element
                var data;

                if (this.model) {
                    data = this.model.getData();
                }

                this.$el.val(data);

                // adding two way binding
                this.$el.on('onblur'+this.id, function(){
                    this.model.setData(this.val());
                });

                return this.$el;
            }
        });
    });
