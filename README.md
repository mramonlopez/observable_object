# SubjectObject

It's a simple Javascript class that implement the Subject part in a Observer-Subject relationship.

## How to use

In order to create a Observable object (subject) you have to extend SubjectObject class, adding observable properties using 'createProperty' method

```javascript 
// Observable object
var Foo = function() {
    SubjectObject.call(this);

    this.createProperty('a');
    this.createProperty('b');

    this.a = "...";
    this.b = 12;
}

Foo.prototype = Object.create(SubjectObject.prototype);
Foo.prototype.constructor = Foo;
```

Then you can add a listener (Observer) using 'addObserver' method:

```javascript 
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
```

When a property of 'f' object is changed
```
f.a = 'Hello world';
```
all listeners are notified (called)
```
Property " a " has changed
New value: " Hello world "
Old value: " ... "
```
