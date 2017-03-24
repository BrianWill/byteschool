# Go defer, panic, and recover

## `defer` statements

A `defer` statement defers execution of a function or method call. Every `defer` adds another call to a list belonging to the containing function or method call; when the call ends, its list of defered calls are executed in reverse order (*i.e.* the last defered call runs first). 

```go
// prints: "1", then "2", then "3", then "4"
func foo() {
    fmt.Println("1")
    defer fmt.Println("4")
    defer fmt.Println("3")
    if false {
        defer fmt.Println("never")   // this defer statement is never executed, so this call is never defered
    }
    fmt.Println("2")
}
```

Defering calls can be useful for doing clean-up business, such as making sure a file is closed when execution leaves a call.

## panics

A ***panic*** is triggered by various bad operations. Some example bad operations:

 - accessing an array or slice index that is out of bounds
 - invoking a method *via* a nil interface value
 - sending to a closed channel
 - asserting the wrong type using the single-return form of type assertion

When a panic occurs in a goroutine, execution backs out of the call chain, executing all deferred calls as it goes. For example, say a goroutine executes A, which calls B, which calls C, which panics. If A, B, and C have deferred calls before the panic, the deferred calls will run in reverse order: C, then B, then A. 

Once a panic backs execution out of a goroutine, the whole program aborts regardless whether other goroutines are still executing. 

Calling the built-in function *panic* triggers a panic in the current goroutine. Deliberately triggering panics is sometimes appropriate, such as when the caller passed bad arguments. (Passing bad arguments is a bug, not an error: we should fix the code to stop passing bad arguments.)

```go
func foo(a int, b int) int {
    // ...
    if badInput {
        panic()
    }
    // ...
}
```

## recovering from panics

We can stop a panic and resume a goroutine's normal execution using the built-in function *recover*. When called directly from a defered call, recover stops the panic from propagating up to the next call:

```go
func foo() {
    defer func() {
        fmt.Println("still recovering")
    }()

    defer func() {
        recover()
        fmt.Println("recovering")
    }()

    panic()
}

func main() {
    foo()           // prints: "recovering", then "still recovering"
    // ... execution continues normally
}
```

Above, we recover in a defered call of *foo*, so execution resumes normally where *foo* was called. But what if `foo` returned a value?

```go
func foo() int {
    defer func() {
        recover()
    }()

    panic()
    return 3
}

func main() {
    z := foo()         // 0
}
```

Here, the recovered call returns a zero value. Using return variables, defered calls can set the return value to something else:

```go
func foo() (a int) {
    defer func() {
        recover()
        a = 5
    }()

    panic()
    return 3
}

func main() {
    z := foo()         // 5
}
```

We can pass a single value of any type to *panic*. This value is then returned by *recover* (as an empty interface value):

```go
func foo() (a int) {
    defer func() {
        a = recover().(int)   // type assert into an int
    }()

    panic(7)
    return 3
}

func main() {
    z := foo()         // 7
}
```

If no value is passed to *panic*, *recover* returns `nil`.

A call to *recover* outside a defered call during a panic does nothing and returns `nil`:

```go
func main() {
    z := recover()     // does nothing and returns empty interface value nil
}
```

If a panic is triggered while a panic is already in progress, the defered call where the second panic occurs aborts, but otherwise the panic continues as normal.