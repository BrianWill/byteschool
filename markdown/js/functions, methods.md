# Javascript functions, methods

## functions

A `function` statement creates a function. The parameters are separated by commas and surrounded in parens. The body of the function is surrounded in curly braces:

```javascript
// create a function 'foo' with parameters 'a' and 'b'
function foo(a, b) {
    // ... function body goes here
}
```

A function call is denoted with the function name *before* the open paren, and the arguments are separated by commas:

```javascript
foo(6, "hi", 2)        // call function 'foo' with arguments 6, "hi", and 2
```

If a function does not explicitly return a value with a `return` statement, it implicitly returns the value `undefined`.

Like in Pigeon, functions are values: we can assign them to variables, pass them into functions, and return them from functions. An *anonymous function* is an expression returning a new function. It looks just like a statement defining a function, but we don't have to specify a name after `function`:

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

## methods

Like any other value, we can assign a function to keys of an object. When invoking a function *via* an object property with the `.` operator, the object itself is passed to a special parameter called *this*:

```javascript
var x = {};
x.foo = function() {
    return this;         // return value of the special parameter 'this'
};

x.foo();                 // the value of 'x' is passed to 'this'
```

In this arrangement, the function is sometimes called a ***method*** of the object.

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
var x = {foo: 9};
x.foo();                     // exception: x.foo is a number, not a function
x.bar();                     // exception: x.bar is undefined, not a function
```
