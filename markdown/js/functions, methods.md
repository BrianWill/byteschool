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

Like in Pigeon, functions are values: we can assign them to variables, pass them into functions, and return them from functions.

## anonymous and nested functions

A ***nested function*** is a function created inside another function. A function statement inside another function assigns the nested function to a local variable of the enclosing function:

```javascript
function foo() {
    // the new function is assigned to local variable 'bar' of the function 'foo'
    function bar() {
        // ...
    }
    // ...
}
```

An ***anonymous function*** is a function created as an expression rather than a statement:

```javascript
// an anonymous function assigned to variable 'foo'
var foo = function(a, b) {
    return a + b;
};

// same as above, but the anonymous function is surrounded in parens for clarity
var foo = (function(a, b) {
    return a + b; 
});
```

A function statement is really just shorthand for declaring a variable and assigning it an anonymous function:

```
// a function statement assigning a new function to variable 'foo'
function foo(a, b) {
    return a + b;
}
```

Anonymous functions are especially convenient when we create a function only for the purpose of passing it as argument to a call:

```javascript
// call 'foo', passing a new function
foo(function(a, b) {
    return a + b;
});
```

## arguments array

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

Like any other type of value, we can assign functions to keys of objects. When invoking a function *via* an object property with the `.` operator, the object itself is passed to a special parameter called *this*:

```javascript
var x = {};
x.foo = function() {
    return this;         // return the value of the special parameter 'this'
};

x.foo();                 // the value of 'x' is passed to 'this'
```

In this arrangement, the function is what we call a ***method*** of the object.

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
