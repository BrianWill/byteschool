# Javascript exceptions, closures

## exceptions

Certain bad operations will trigger an error for certain invalid operands. For example, the `[]` operator used on `null` (a special value used to indicate 'nothing is here') triggers an *exception* (what Javascript calls a runtime error):

```javascript
var x = null;
var y = x[3];               // exception: cannot get index 3 of null
```

When an exception occurs, execution backs out of the call chain: if *foo* calls *bar* calls *ack* and an exception triggers in *ack*, execution backs up to where *ack* was called in *bar*, then to where *bar* was called in *foo*, and then to where *foo* was called. Once an exception reaches the top-level of code, it backs up one more level, ending execution.  

We can use a `try-catch` statement to 'catch' exceptions thrown in the `try` clause:

```javascript
try {
    // An exception in here jumps execution to the associated catch clause.
} catch (ex) {
    // Once execution is here, the exception stops propagating.
    // The exception is represented as an error value.
    // This error value is assigned to the variable name specified in the parens ('ex', in this case).
}
```

## closures

A nested function can read and write the variables of the enclosing function call in which the nested function is created: 

```javascript
function foo() {
    // main has three local variables: 'a', 'b', and 'bar'
    var a = 3;
    var b = 11;
    var bar = function() {
        // this function has its own local 'x', but we can also use 'a', 'b', and 'bar' of the enclosing function call
        var x = 2;
        return x + a;
    };
    return bar() * b;      // returns 55
}
```

In fact, even when the enclosing function call returns, the nested function can continue to use the enclosing call's variables *even though a call's local variables normally disappear after the call returns*. In other words, the nested function can *retain* local variables of the enclosing function (or method) calls. A ***closure*** is a value that references a function and a set of retained variables:

```javascript
function foo() {
    var a = 2;
    return function() {
        // 'a' is from enclosing call
        a = a + 3;
        return a;
    };
}

var x = foo();        // assign closure to 'x' (function returned by 'foo' retains variable 'a')
x();                  // 5
x();                  // 8
x();                  // 11

var y = foo();        // assign a different closure to 'y' (same function but a different retained variable 'a')
y();                  // 5
y();                  // 8
y();                  // 11

x();                  // 14
x();                  // 17
y();                  // 14
y();                  // 17
```