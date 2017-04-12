# Go data types and variables

## static typing vs. dynamic typing

Go is a statically-typed language whereas Pigeon is a dynamically-typed language.

In a statically-typed language, each variable (including each function parameter) is marked by a designated type such that only values of the designated type can be assigned to the variable. Functions are also marked by a 'return type', such that you must always return values of that type (and only that type) from the function.

The compiler will refuse to compile the code if you:

 - use the wrong type of operands in an operation
 - assign the wrong type of value to a variable
 - pass the wrong type of argument to a function
 - return the wrong type of value from a function

In a dynamically typed language like Pigeon, the code will compile and execute regardless of such problems. However, when an operation in a dynamic language is executed with the wrong type(s) of operands, an error occurs, aborting execution.

Static typing has the advantage of detecting all ***type errors*** at compile time, before the code even runs. With dynamic typing, a type error may lurk undetected in some uncommonly executed branch of code. On the other hand, static typing can require more thinking about types up front, which may feel onerous or inhibiting. Some programmers prefer static typing; others prefer dynamic typing.

## basic data types and variables

The basic data types in Go are:

```
  bool        (short for 'boolean', a value that is either true or false)
  string

  float32     (32-bit floating point)
  float64     (64-bit floating point)

  int         (signed integer, either 32 or 64 bits depending upon the compilation target)
  int8        (8-bit signed integer)
  int16       (16-bit signed integer)
  int32       (32-bit signed integer)
  int64       (64-bit signed integer)

  uint        (unsigned integer, either 32 or 64 bits depending upon the compilation target)
  uint8       (8-bit unsigned integer)
  uint16      (16-bit unsigned integer)
  uint32      (32-bit unsigned integer)
  uint64      (64-bit unsigned integer)
 ```

A variable is created with a declaration statement: the reserved word `var`, followed by the variable name, followed by the variable's type. For example:

```go
var foo int           // a variable named 'foo' of type int
```

An assignment statement is written with `=` (not to be confused with `==`, the equality operator):

```go
foo = 9               // assign 9 to variable 'foo'
```

We can assign to a variable in its declaration:

```go
var foo int = 9       // declare int variable 'foo' and assign it the value 9
```

A variable which has been declared but not yet assigned a value has the default ***zero value*** of its type. For number types, the zero value is (unsuprisingly) `0`. The zero value string is an empty string, `""`. The zero value bool is `false`.

```go
var a float64      // 0.0
var b string64     // ""
var c bool         // false
```

A variable can only be assigned values of its own type:

```go
var foo int
var bar string
foo = "hi"                // compile error: cannot assign a string to an int variable
bar = foo                 // compile error: cannot assign an int to a string variable
```

Number constants (number values written in code) do not have a specific type. A constant value must simply be valid for the target variable's type:

```go
var a int = 9             // ok
var b uint16 = 80         // ok
var c uint16 = -80        // compile error: a uint16 value cannot be negative
var d float32 = -80       // ok
var e float32 = 79.042    // ok
vad f int64 = 79.042      // compile error: an int64 value must be an integer
var g int8 = 2000         // compile error: the max value of an int8 is 127
```

The operands of an arithmetic operation must both be the same type. The return value is the same type as the operands:

```go
var foo int = 2
var bar int = 3
bar = foo * bar    // ok: multiplying two ints returns an int

var x int = 2
var y int8 = 3
y = x * y          // compile error: the operands to * are not the same type
```

Arithmetic operations may overflow or underflow:

```
var x uint8 = 255
x = x + 1             // 0      (wrapped from max value down to min value)
x = x - 1             // 255    (wrapped from min value up to max value)
```

## casting

Given a value, we can produce its equivalent (or approximation, as the case may be) as another type using a ***cast operation***. To cast a value *V* into type *T*, we write `T(V)`:


```go
var foo int
var bar uint
bar = uint(foo)           // cast the int to a uint
```

(Though casts look like function calls, think of casts as operations built-in to the language.)

In some cast operations, the returned value is an approximation because the destination type has no exact equivalent:

```go
var foo int
var bar float32 = 8.2
foo = int(bar)            // the cast to int returns 8
```

Not all casts are valid, *e.g.*:

```go
var s string = "yo"
var b bool = bool(s)      // compile error: cannot cast string to bool
```

## inferred variable types

As a convenience, if a declaration is assigned a value, the type can be inferred from the assigned value. An integer number constant will be assumed to be an `int`, and a floating-point number constant will be assumed to be a `float64`:

```go
var a = 9                // inferred to be an int
var b = foo()            // inferred to be whatever type 'foo' returns
var c = 4.11             // inferred to be a float64
var d = float32(8)       // inferred to be a float32
var e = true             // inferred to be a bool
```

As a shorthand, we can write `:=` and omit `var`:

```go
a := 9                // declare int variable 'a' and assign it 9
b := foo()            // etc.
c := 4.11             
d := float32(8)       
e := true             
```






