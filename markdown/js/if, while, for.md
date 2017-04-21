# Javascript `if`, `while`, `for`, arrays, strings

## if, while, and for statements

An `if` statement is written with the condition surrounded in parens and the body in curly braces:

```javascript
if (x < 3) {
    // ... body of the if   
} else if (x > 8) {
    // ... body of an else if clause
} else {
    // ... body of the else clause
}
```

Same for a `while` statement:

```javascript
while (x < 3) {
    // ... body of the while
}
```

Javascript does not require you to indent your code, but it makes your code more readable to do so.

A `for` statement is a convenient variation of `while`. The `for` condition is flanked by a 'precondition' and a 'postcondition', separated by semicolons: the precondition is a variable declaration and assignment; the postcondition can be any expression but is usually an increment or decrement of a variable. These two loops are functionally equivalent:

```javascript
var i = 0;
while (i < 8) {
    // ... body of the loop
    i = i + 1;                  // increment the value of 'i'
}

for (var i = 0; i < 8; i = i + 1) {
    // ... body of the loop
}
```

## truthy vs. falsey

The condition of an `if` or loop can be any kind of expression because all values in Javascript are either 'truthy' or 'falsey'. The 'falsey' values are:

- false
- null
- undefined
- 0
- "" (an empty string)
- NaN (the special number value 'Not a Number')

All other values are truthy.

```javascript
// 3 is truthy, so the condition is true
if (3) {     
    // ...
}
```

## the `&&` and `||` operators

The `&&` (logical 'and') operator expects two operands. If the first operand is falsey, `&&` returns the first operand; otherwise, it returns the second operand:

```javascript
var a = false && 3;       // false
var b = true && 3;        // 3
var c = true && 0;        // 0
```

In effect, the returned value will be truthy only when both operands are truthy; otherwise, the returned value is falsey. Note that, when the first operand is falsey, it doesn't matter what the second operand is! Therefore it's OK that the `&&` operator 'short-circuits': when the first operand is falsey, it doesn't evaluate the second operand:

```javascript
var a = false && foo();   // false (function 'foo' is not called!)
var b = true && foo();    // the value returned by calling 'foo'
```

The `||` (logical 'or') operator is very similar, but logically inverted: if the first operand is *truthy*, `||`  returns the first operand; otherwise, it returns the second operand:

```javascript
var a = false || 3;       // 3
var b = true || 3;        // true
var c = true || 0;        // true
```

In effect, the returned value will be truthy when one or both operands are truthy; otherwise, the returned value is falsey. When the first operand is truthy it doesn't matter what the second operand is, and so the `||` operator short-circuits: when the first operand is truthy, it doesn't evaluate the second operand:

```javascript
var a = true || foo();    // true (function 'foo' is not called!)
var b = false && foo();   // the value returned by calling 'foo'
```