'use strict';
/* eslint-disable no-underscore-dangle */

var ObservableObject = function () {
    this._observerTable = [];
    this._propertiesBag = [];
};

ObservableObject.prototype.createProperty = function (property) {
    let value = this[property]

    if (this.hasOwnProperty(property)) {
        delete this[property]
    }

    Object.defineProperty(this, property, {
        get: function () {
            return this._propertiesBag[property];
        },

        set: function (value) {
            if (this._propertiesBag[property] !== value) {
                var oldValue = this._propertiesBag[property];

                this._propertiesBag[property] = value;

                for (var i = 0, n = this._observerTable.length; i < n; i++) {
                    var boundFunction = this._observerTable[i];
                    boundFunction(this, {property: property, oldValue: oldValue});
                }
            }
        },

        enumerable: true,
        configurable: true
    });

    this[property] = value
};

ObservableObject.prototype.addObserver = function (f) {
    if (f && typeof f === 'function') {
        this._observerTable.push(f);
    }
};

ObservableObject.prototype.removeObserver = function (f) {
    var index = this._observerTable.indexOf(f);

    if (index > -1) {
        this._observerTable.splice(index, 1);
    }
};

ObservableObject.prototype.set = function (properyList) {
    var changes = [];

    properyList.forEach(function(keyValue) {
        var property = keyValue.property;
        var value = keyValue.value;

        if (this._propertiesBag.hasOwnProperty(property) && this._propertiesBag[property] !== value) {
            var oldValue = this._propertiesBag[property];
            this._propertiesBag[property] = value;

            changes.push({
                property: property,
                oldValue: oldValue
            })
        }
    });

    if (changes.length > 0) {
        // Notify
        for (var i = 0, n = this._observerTable.length; i < n; i++) {
            var boundFunction = this._observerTable[i];
            boundFunction(this, changes);
        }
    }
};

module.exports = ObservableObject

/* eslint-enable no-underscore-dangle */
