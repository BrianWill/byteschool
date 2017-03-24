## multi-assignment

In an assignment statement, we can assign multiple values separated by commas to multiple variables separated by commas:

```go
var a int
var b string
a, b = 3, "hi"        // assign 3 to 'a'; assign "hi" to 'b'
```

We can also declare multiple variables of the same type in one `var` using commas:

```go
var a, b int
a, b = 3, 5
```

We can assign to these variables in the declaration:

```go
var a, b int = 3, 5
```

The type can be left inferred, in which case the types can be different:

```go
var a, b = 3, "hi"    // 'a' is an int; 'b' is a string
a, b := 3, "hi"       // shorthand for previous statement
```

Normally, Go complains if you declare a variable more than once in a single scope:

```go
a := 3
a := 5                // compile error: 'a' declared more than once
```

However, `:=` will ignore a redeclaration as long as one of the variables is not previously declared and the type for that variable is the same in the redundant declarations:

```go
a := 3
a, b := 5, 9          // ok: 'b' not previously declared
a, c := "hi", 9       // compile error: 'a' previously declared as an int
```

## multi-return functions

A Go function can return multiple values:

```go
// function 'foo' returns both an int and a string
func foo() (int, string) {
    return 3, "hi"
}

func main() {
    a, b := foo()     // assign 3 to 'a'; assign "hi" to 'b'
}
```

For any returned values you don't want to use, you can assign them to the special *blank identifier*, a single underscore. When assigning to the bank identifier, no variable is actually created. The value assigned to it is simply discarded:

```go
a, b, c := bar()      // assign the first returned value to 'a'; assign the second to 'b'; assign the third to 'c'
a, b, _ := bar()      // assign the first returned value to 'a'; assign the second to 'b'; discard the third
_, b, _ := bar()      // discard the first returned value; assign the second to 'b'; discard the third
```

The compiler will complain about any multi-return function called in a 'single-value context':

```go
func foo() (int, string) {
    return 3, "hi"
}

func bar(a int, b string) {
    // ...
}

func main() {
    a, b := foo()     // ok
    bar(a, b)         // ok

    z := foo()        // compile error: multi-return function called in a single-value context
    bar(foo())        // compile error: multi-return function called in a single-value context
}
```


