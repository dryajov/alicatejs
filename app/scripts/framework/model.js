/**
 * Created by dmitriy.ryajov on 7/2/14.
 */
define(
    [
        'framework/observable'
    ],
    function (observable) {
        'use strict';

        return observable.extend({
            initialize: function() {
                observable.prototype.initialize.call(this);

                if (typeof this.data == 'object'
                    && (this.property &&
                        this.property.length > 0)) {
                   this._unwindData();
                }
            },
            /**
             * The data held by this model
             *
             */
            data: null,
            /**
             * Optional property to look for in data when an object is passed
             *
             * It supports the <tt>.</tt> (dot) syntax for nested objects
             *  ```'prop1.prop2.prop3'```
             */
            property: null,
            /**
             * Get the data of the model
             *
             * @returns {null}
             */
            get: function () {
                if (this.property && this.property.length > 0) {
                    return this.data[this.property];
                }

                return this.data;
            },
            /**
             * Set the data of the model
             *
             * @param value
             */
            set: function (value) {
                if (this.property && this.property.length > 0) {
                    this.data[this.property] = value;
                } else {
                    this.data = value;
                }

                this.update(value);
            },
            _unwindData: function () {
            var props = this.property.split('.'),
                prop;

            if (props.length > 1) {
                for (prop in props) {
                    if (data.hasOwnProperty(props[prop])) {
                        this.data = this.data[props[prop]];
                    }
                }
            }
        }
        });
    });
