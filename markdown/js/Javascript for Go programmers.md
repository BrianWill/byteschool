# Javascript for Go programmers

## running Javascript code

A web browser includes a *Javascript engine*, a component for compiling and runnning Javascript code. When you visit a web page, Javascript code included with the page is compiled and run by the browser. The code can manipulate the page, respond to user interactions, and retrieve more data from servers, but it cannot access files on the local system or perform other security-sensitive tasks.

*Node.js* (usually just called 'Node') is a Javascript engine for running standalone programs outside any web browser. Unlike web browsers, Node lets Javascript code access files and all the other things which normal programs can do. Node is most commonly used for creating servers (programs which listen and respond to requests from other computers over the network).

## dynamic typing

Though Javascript syntactically resembles Go, it's a dynamically-typed language and thus more like Pigeon. We never explicitly define or specify types in Javascript.

A variable is declared with a `var` statement like in Go, but we never specify a type because Javascript variables have no type. We can assign any type of value to a variable, and the variable will store a reference to that value:

```javascript
var x;               
var y = "hi";
y = 9;               // ok: 'y' can reference any type of value
```

(Javascript has no `:=` syntax. You must always use `var` to create variables. Like Go, Javascript will assume implicit semi-colons in certain places, but Javascript's rules for implicit semi-colons are poorly thought out. In practice, you should write all semi-colons explicitly.)

A `function` statement creates a function. A function can take any types of values as input and return any types as output:

```javascript
// create a function 'foo' with parameters 'a' and 'b'
function foo(a, b) {
    if a > 10 {
        return a + b;
    }
    return "yo";
}

foo(15, 2);         // 17
foo(4, 2);          // "yo"
```

Just because you *can* pass a function any type of input doesn't mean you *should*. Rather, because the language does no type checking, that means it's *your responsibility as the caller* to make sure you pass the appropriate type(s). If you pass the wrong type(s), all sorts of bugs might occur.

Javascript's operators are extremely forgiving---*too* forgiving---about what inputs they accept. For example, you might think adding a number to a string makes no sense, but Javascript just assumes you meant to get the string equivalent of the number and concatenate:

```javascript
var x = 7 + "banana";       // "7banana"
```

A few operators, however, will trigger an error for certain invalid operands. For example, the `[]` operator used on `null` (a special value used to indicate 'nothing is here') triggers an *exception* (what Javascript calls a runtime error):

```javascript
var x = null;
var y = x[3];               // exception: cannot get index 3 of null
```

Javascript has no concept of namespaces. A function or variable defined at the top-level of code is global to the whole program.

Javascript has no explicit compilation step. A Javascript engine takes source files as input and immediately runs the code in those files. The top-level of code is a series of statements that execute in order, starting with the first source file and then moving on to the next. When an executed statement uses a variable or function name that hasn't yet been created by an already executed statement, an exception is triggered.

## data types

The boolean values are written `true` and `false`.

The special value `null` is used to signify 'nothing here right now'.

The special value `undefined` is used to signify 'nothing was ever here'.

All numbers in Javascript are 64-bit floating-point:

```javascript
var x = 0;             // a 64-bit floating-point value
var y = -9.2;          // a 64-bit floating-point value
```

Strings can be denoted in double-quote marks or single-quote marks. Each character is stored as a 16-bit unsigned integer. A string stores its own length, which we can access with the dot operator:

```javascript
var x = "hello";       
var y = x.length;      // 5
```

The `[]` operator used on a string returns an individual character as a string:

```javascript
var x = "hello";
var y = x[0];          // "h"
```

An array in Javascript is not fixed in size and can store any type of value. An array is created by listing zero or more values inside `[]`. Like a string, an array stores its own length, which we can access with the dot operator:

```javascript
var a = [7, 16, "hi", -9];
var b = a.length;            // 4
var c = a[0];                // 7
var d = a[3];                // -9
a[1] = "yo";
var e = a[1];                // "yo"
```

Assigning to an index out of bounds grows the array. Indexes without values default to the special value `undefined`:

```javascript
var a = [];                  // a new, empty array
var b = a.length;            // 0
a[10] = "yo";
var c = a.length;            // 11
var d = a[7];                // undefined
var e = a[10];               // "yo"
```

What Javascript calls an ***object*** is a map in which the keys are strings and the values can be any type. An object is created by listing zero or more key-value pairs inside `{}`. Accessing a non-existent key returns `undefined`. Assigning to a non-existent key creates a new key-value pair:

```javascript
var a = {"fred": 3, "amy": 9, "rubber ducky": "hi"};
var b = a["fred"];                                       // 3
var c = a["amy"];                                        // 9
var d = a["rubber ducky"];                               // "hi"
var e = a["rumpelstiltskin"];                            // undefined
a["rumpelstiltskin"] = "yo";                             // create new key-value pair
```

A *property* is an object key which resembles a variable (in that it consists of just letters of the alphabet, numerals, and underscores). As a convenience, we can omit quote marks around property names when creating an object, and we can use the `.` operator instead of `[]` when accessing properties:

```javascript
// the key "rubber ducky" is not a property because it contains a space
var a = {fred: 3, amy: 9, "rubber ducky": "hi"};
var b = a.fred;                                          // 3
var c = a.amy;                                           // 9
var d = a["rubber ducky"];                               // "hi"
var e = a.rumpelstiltskin;                               // undefined
a.rumpelstiltskin = "yo";                                // create new key-value pair
```

Javascript does not have structs. Instead, we just use objects.

Javascript does not have pointers. All variables are references already!

## functions

Like in Go, functions are values: we can assign them to variables, pass them into functions, and return them from functions. An *anonymous function* is an expression returning a new function. It looks just like a statement defining a function, but we don't have to specify a name after `function`:

```javascript
var foo = (function(a, b) {
    // ...
});                       
```

(The parens surrounding the function are not needed, but I include them to emphasize that this is an expression. Also note the semi-colon at the end.)

A function statement is really just shorthand for declaring a variable and assigning it an anonymous function:

```javascript
// just like the previous example, this creates a variable 'foo' and assigns it a new function
function foo(a, b) {
    // ...
}
```

We can call a function with extra arguments with no error. Every function automatically has a local variable *arguments* which is assigned an array containing every argument to the call:

```javascript
function foo(a, b) {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum = sum + arguments[i];
    }
    return a + b + sum;
}

foo(1, 2);                // 3     (1 + 2)
foo(1, 2, 3, 4);          // 10    (1 + 2 + 3 + 4)
```

If we call a function with too few arguments, the parameters given no arguments have the value `undefined`:

```javascript
function foo(a, b) {
    return b;
}

foo(3);                   // undefined
```

If a call ends without executing a `return` statement, the call returns `undefined`.

No matter where we put a `var` inside a function, it creates a variable local to the whole function. In effect, it's as if every `var` were at the start of the function:

```javascript
function foo(a) {
    b = 10;
    if a < 4 {
        var b = a + 3;
    }
    c = b * 7;
    return c;
    var c;
}

// no different from previous
function foo(a) {
    var b;
    var c;
    b = 10;
    if a < 4 {
        b = a + 3;
    }
    c = b * 7;
    return c;
}
```

(Don't think of variable declarations in functions as actions to execute when the function is called: rather, when a function is created, the declarations just tell the compiler what variables exist in its scope.)

Like in Go, functions in Javascript can be nested and form closures.

## `if`, `for`, `for-in`, `while`

The condition of an `if` is written inside parens:

```javascript
if (x == 3) {
    // ...
}
```

The pre-condition, condition, and post-condition of a `for` are surrounded in parens. The semi-colons cannot be omited:

```javascript
for (var i = 0; i < 10; i++) {
    // ...
}
```

A `for-in` loop iterates over the indexes of an array:

```javascript
var x = [10, 20, 30, 40, 50];
var y = [];
// copy every element of 'x' to 'y'
for (var i in arr) {
    y[i] = x[i];         // 'i' is the index, not the value!
}
```

A `for-in` loop can also iterate over the keys of an object. No guarantee is made about the order in which `for-in` will go through the keys:

```javascript
var obj = {amber: 2, brandy: 9, todd: 5};
var arr = [];
// add every key of 'obj' to 'arr'
for (var k in obj) {
    arr[arr.length] = k;
}
var a = arr;       // ["amber", "brandy", "todd"]      (the order might be different!)
```

## methods

Like any other value, we can assign a function to keys of an object. When invoking a function *via* an object property with the `.` operator, the object itself is passed to a special parameter called *this*:

```javascript
var x = {};
x.foo = function() {
    return this;         // return value of the special parameter 'this'
};

x.foo();                 // the value of 'x' is passed to 'this'
```

Effectively, the function property can be called as a method of the object.

If a function that uses the special parameter *this* is called as a function rather than a method, *this* is passed an object that represents the global namespace of the program:

```javascript
var bar = 9;                // a global
function foo() {
    return this.bar + 2;
}
foo();                      // 11
```

(This behavior is not useful: it's simply a mistake in Javascript's design! If a function uses *this*, it should only be called as a method.)

If we invoke a property which is not a function or does not exist, we get an exception:

```
var x = {foo: 9}
x.foo();                     // exception: x.foo is a number, not a function
x.bar();                     // exception: x.bar is undefined, not a function
```

Javascript does not have interfaces. Rather, an object either has a method or it doesn't. Invoking a method which an object doesn't have simply triggers an exception at runtime.

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

In addition to their *length* properties, [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2) and [arrays](https://www.w3schools.com/jsref/jsref_obj_array.asp) each have a few dozen methods. For example:

```javascript


```

Be clear that strings and arrays are not really objects. They contain a few properties, and like an object, they are linked to another object that contains some methods. However, we cannot assign them arbitrary properties.

## exceptions

An *exception* is Javascript's analog of a Go panic. When an exception occurs, execution backs out of the call chain.

Javascript has no `defer` statements or *recover* function. Instead, it has `try-catch`:

```javascript
try {
    // An exception in here jumps execution to the associated catch clause.
} catch (ex) {
    // Once execution is here, the exception stops propagating.
    // The exception is represented as an error value.
    // This error value is assigned to the variable name specified in the parens ('ex', in this case).
}
```

## event-based execution, threads

no goroutines: just single-threaded (except web workers)


