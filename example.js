// Observable object
var Foo = function() {
    ObservableObject.call(this);

    this.createProperty('a');
    this.createProperty('b');

    this.a = "...";
    this.b = 12;
}

Foo.prototype = Object.create(ObservableObject.prototype);
Foo.prototype.constructor = Foo;


// Observer
var Bar = function() {

}

Bar.prototype.listen = function(object, changes) {
    var property = changes.property;

    console.log('Property "', property, '" has changed');
    console.log('New value: "', object[property], '"');
    console.log('Old value: "', changes.oldValue, '"');
}

// Link
var f = new Foo();
var b = new Bar();

f.addObserver(b.listen);

f.a = 'Hello world';
