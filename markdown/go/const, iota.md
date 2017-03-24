# Go named constants

## named constants

A ***literal*** is a value written directly in code:

```
35                         // an integer literal
72.1                       // a floating-point literal
"hello, world"             // a string literal
true                       // a boolean literal
```

In Go, these literals are considered *constants* without any specific type:

```
type vinny bool
type gina string

var a float64 = 3          // the constant 3 is a valid float64 value
var b vinny = false        // the constant false is a valid 'vinny' value
var c gina = "hi"          // the constant "hi" is a valid 'gina' value
```

We can define ***named constants***. Like variables, named constants belong to the scope in which they are declared, but named constants cannot be assigned new values:

```go
const foo = 57             // create a constant named 'foo' with value 57
a := foo + 3               // 60
foo = 9                    // compile error: cannot assign to a constant
```

A named constant's value must be a compile-time expression (so it can't include variables or function calls):

```go
const foo = 57 + bar()     // compile error: compile-time expression cannot include a function call
```

A named constant can be given a specific type, in which case the usual type rules apply:

```go
const bar float32 = 57
a := foo                   // 'a' is a float32
var z int = foo            // compile error: cannot assign a float32 to an int
```

We can create multiple named constants with this syntax:

```go
const (
    foo = 3
    bar = "hi"
    ack = 87.2
)
```

## iota

In the parentheses form of `const`, we can use the reserved word `iota` as the value for the first constant and leave the value of the other constants implied. The first constant will be 0, the second will be 1, the third 2, *etc.*:

```go
const (
    foo = iota           // 0
    bar                  // 1
    ack                  // 2
)
```

If we specify a type for the first constant, all other constants will have the same type:

```go
const (
    foo int64 = iota     // int64(0)
    bar                  // int64(1)
    ack                  // int64(2)
)
```

The word `iota` can be used in an expression. The same expression is used to generate all the constant values, with `iota` as 0 for the first constant and incrementing by 1 for each additional constant:

```go
const (
    a = 3 * iota         // 0     (3 * 0)
    b                    // 3     (3 * 1)
    c                    // 6     (3 * 2)
    d                    // 9     (3 * 3)
    e                    // 12    (3 * 4)
    f                    // 15    (3 * 5)
)
```