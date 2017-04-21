# Javascript object links, string and array methods

## object links

The global namespace contains an object called *Object* which has a method *create*. The *create* method takes an object and returns a new object that is linked to the first:

```javascript
var x = {};
var y = Object.create(x);     // return an object linked to the object referenced by 'x'
```

When we retrieve the value of a key from an object but the object has no such key, Javascript will follow the link to find the key:

```javascript
var x = {};
var y = Object.create(x); 
var a = y.foo;                // undefined    (neither 'y' itself nor 'x' have a property 'foo')
x.foo = 3;
var b = y.foo;                // 3            (the value of property 'foo' of 'x')
y.foo = 9;                    
var c = y.foo;                // 9            (the value of property 'foo' of 'y')
```

We can form a chain of more than two linked objects: A can link to B which links to C which links to D, *etc.* When we retrieve the value of a key, Javascript will search up the chain, in order, until it finds the key; if no object in the chain has the key, `undefined` is returned.

When we make a method call, Javascript searches up the chain like with any other property access, but it's always the object *via* which we made the call which gets passed to the *this* parameter:

```javascript
var x = {};
var y = Object.create(x);
x.foo = function() {
    // ...
}
y.foo();                    // invokes 'foo' of 'x', but passes 'y' to the *this* parameter
```

What is all this linking behavior good for? Say we want to create a bunch of objects with the same methods. Instead of giving each object its own property for each method, we can link all of the objects to one object that contains the methods:

```javascript
var stuff = {};
// add method properties to 'stuff'

// these objects all link to 'stuff' and so can call any of its methods
var a = Object.create(stuff);
var b = Object.create(stuff);
var c = Object.create(stuff);
var d = Object.create(stuff);
```

## string and array methods

In addition to their *length* properties, [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2) and [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) each have a few dozen method properties. For example:

```javascript
var x = "foo".toUpperCase();                     // "FOO"

// the substring method returns a string with the characters from the first index up to (but not including) the second
var y = "George Washington".substring(3, 9)      // "rge Wa"

var a = [6, "hi", 2];

// the push method appends an element to the end and returns the appended element
var b = a.push("yo");                            // "yo"

// the pop method removes an element from the end and returns the removed element
var c = a.pop();                                 // "yo"
```