# Go variadic functions and return parameters

## variadic functions

A *variadic function* is a function in which the last parameter is a slice denoted by `...` instead of the normal `[]`. A variadic function is called not by passing a slice to this last parameter but rather zero or more elements that get automatically bundled into a new slice:

```go
// 'foo' is variadic
// 'b' is a []int but gets its argument in a special way
func foo(a string, b ...int) {
    // ...
}

func main() {
    foo("hi", 3, 2, 7)         // passes []int{3, 2, 7} to parameter 'b'
    foo("hi", 3)               // passes []int{3} to parameter 'b'
    foo("hi")                  // passes []int{} to parameter 'b'
}
```

This minor syntax allowance simply spares us from creating these new slices explicitly in each call:

```go
// what we would have to write instead if 'foo' were not variadic
func main() {
    foo("hi", []int{3, 2, 7})
    foo("hi", []int{3})
    foo("hi", []int{})
}
```

If we want to pass an already existing slice to a variadic function, we can do so using `...` as a suffix on the last argument:

```go
func main() {
    x := []int{3, 2, 7}
    foo("hi", x...)            // passes the slice to parameter 'b'
}
```

## return variables

The return types of a function can be given associated variables. A `return` statement with no explict values returns the value(s) of the return variable(s). The return variables have zero values at the start of the call:

```
// 'bar' has a return variable 'a' of type int 
func bar(x int) (a int, b string) {
    // 'a' starts out 0, 'b' starts out ""
    a = 3
    b = "hi"
    if x > 7 {
        return        // implicitly returns 'a' and 'b'
    }
    return x, b     
}

func main() {
    i, s := bar(10)    // 3, "hi"
    i, s = bar(5)      // 5, "hi"
}
```

Return variables can occaisonally make a function look a bit cleaner in some cases where the function has many `return` statements. There are also some scenarios involving `defer` statements (discussued later) where return variables are needed.