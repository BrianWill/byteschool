# Go function and method values

## function references and variables

A function's type ***signature*** is the list of its parameter types and return types:

```go
// this function's signature: (string, float32) int
func foo(a string, b float32) int { ... }
```

A function variable references functions with a specified signature. Invoking a function variable invokes whatever function it currently references:

```go
func foo(a int, b byte) { 
    // ...
}

func bar(a int, b byte) string { 
    // ... 
}
    
func main() {
    var f func(int, byte) string      // a variable that can reference functions which take an int and a byte and return a string
    f = bar
    f(8, 2)         // calls 'bar'
    f = foo         // compile error: 'foo' does not have the right signature
}
```

The zero value of a function type is a reference to nothing, and it is denoted `nil`. Invoking a `nil` function value triggers a panic:

```go 
func main() {
    var f func(int, byte) string      // nil
    f(8, 2)                           // panic: cannot invoke nil
}
```

A function can receive function references as inputs and return them as outputs:

```
// 'foo' takes a function (taking an int and returning a string) for its first parameter, takes an int 
// for its second parameter, and returns a function (returning an int)
func foo(a func (int) string, b int) func () byte {
    // ...    
}
```

## method values

A ***method value*** creates a function that represents a method but also has a *bound* value for the receiver. A method value is written like a method call without parens or arguments:

```go
type kim int

func (k kim) foo(a int) int {
    return int(k) + a
}

func main() {
    v := kim(5)
    a := v.foo(2)                   // 7
    var f func(int) int
    f = v.foo                       // creates a function with bound value kim(5)
    b := f(2)                       // 7
}
```

(A struct type cannot have a field and method of the same name because then this syntax for method values would be ambiguous.)

## method expressions

A ***method expression*** creates a function that represents a method but replaces the receiver with an ordinary parameter. A method expression is written with the receiver type in parens, followed by dot and the method name:

```go
type kim int

func (k kim) foo(a int) int {
    return int(k) + a
}

func main() {
    v := kim(5)
    a := v.foo(2)                   // 7
    var f func(kim, int) int
    f = (kim).foo                   // creates a function taking a kim and an int and returning an int
    b := f(v, 2)                    // 7
}
```