# Go nested functions and closures

## nested functions

Functions can be created inside other functions. A nested function has no name, but it is a value and so can be assigned to variables:

```go
func main() {
    var f func(int) int
    // create a function and assign it to 'f'
    f = (func(a int) int {
        return a + 3
    })
    f(8)       // 11
}
```

(The parens around the nested function above are not required, but I include them to emphasize that the function is an expression, *i.e.* it represents a value.)

One reason to create nested functions is simple convenience: we can pass a nested function directly to another function without having to bother giving it a name:

```go
func bar(a func(int) int, b string) { 
    // ... 
}

func main() {
    bar(
        // pass this function directly to 'bar' as its first argument
        func(a int) int {
            return a + 3
        },
        "hi"
    )
}
```

## closures

A nested function can read and write the variables of the enclosing function call in which the nested function is created: 

```go
func main() {
    // main has three local variables: 'a', 'b', and 'bar'
    a := 3
    b := 11
    bar := func() int {
        // this function has its own local 'x', but we can also use 'a', 'b', and 'bar' of the enclosing function call
        x := 2
        return x + a
    }
    fmt.Println(bar() * b)      // prints: 55
}
```

In fact, even when the enclosing function call returns, the nested function can continue to use the enclosing call's variables *even though a call's local variables normally disappear after the call returns*. In other words, the nested function can *retain* local variables of the enclosing function (or method) calls. A ***closure*** is a value that references a function and a set of retained variables:

```go
// 'foo' returns a function taking no parameters and returning an int
func foo() func() int {
    a := 2
    return func() int {
        // 'a' is from enclosing call
        a = a + 3
        return a
    }
}

func main() {
    var x func() int
    var y func() int

    x = foo()   // assign closure to 'x' (function returned by 'foo' retains variable 'a')
    x()         // 5
    x()         // 8
    x()         // 11

    y = foo()   // assign a different closure to 'y' (same function but a different retained variable 'a')
    y()         // 5
    y()         // 8
    y()         // 11

    x()         // 14
    x()         // 17
    y()         // 14
    y()         // 17
}
```