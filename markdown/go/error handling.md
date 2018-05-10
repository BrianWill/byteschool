# Go error handling

## bugs vs. errors

A ***bug*** is anything wrong with our code that requires changing the code to fix.

An ***error*** is something that goes wrong that is outside the control of our code. When our code reads and writes files, or gets keyboard input from the user, or sends data across the network, many things can go wrong that are outside our control: storage drives may fail, users might enter bad input, networks can be overly congested, *etc.* In many cases, there is not much our code can do about such errors except log the problem, alert the user, and abort the program gracefully, making sure to save important data if possible. In other cases, we can cope with errors by simply trying the same thing again or trying alternatives. It depends on the circumstances.

In principle, bugs are always preventable and fixable. Errors are eventualities that our code must live with and should account for.

## error values

An ***error value*** is simply a piece of data describing an error that has occured. An error value may be a message string, or just a number, or something more complicated.

Most errors come from I/O, and I/O is ultimately done by system calls. When an error occurs in a system call, the operating system gives the caller an error value.

In Go, we generally don't invoke system calls directly but instead use standard library packages which do this for us. Functions and methods in these packages will check for error values from the system calls they invoke and return an appropriate error value to the caller. It is the responsibility of the users of these functions and methods to check the returned error value after each call to see if the call completed without error or if something went wrong.

## the *error* interface

Error values come in many different types, but by convention in Go, they all should implement the built-in *error* interface. This interface consists of just one method, *Error()*, which takes no inputs and returns a string describing the error. This makes sense because, whatever the error, there should always be a way of describing the error as text.

The *error* interface doesn't belong to any package. Like *int* or *string*, it is always available without importing anything:

```go
package main

type brad string

// brad implements the error interface
func (b brad) Error() string {
    return string(b)               // because brad is really just a string, we can cast it to a string
}

func foo() {
    b := brad("oh no!")
    var e error = b
    s := e.Error()       // "oh no!"
    fmt.Println(s)
    fmt.Println(e)       // Println knows how to print error interface values
}
```

The *"errors"* package contains a function *New* that returns an *error* value consisting of just a string:

```go
package main

import "errors"

func main() {
    var e error = errors.New("oh no!")
    fmt.Println(e)
}
```

You only need to create your own *error*-implementing types when you need more than just a string to represent the error.

Be careful not to confuse...

 - *error*    (an interface)
 - *Error*    (the only method of the *error* interface)
 - *err*      (the most common name for *error* variables)
 - *errors*   (a standard library package containing a single function, *New*, that creates an *error* value)

For a function that may trigger an error, the convention is to return an *error*, using `nil` to indicate that no error occured. The caller should always check whether the returned *error* is `nil`:

```go
package main

import "errors"

func foo() error {
    var bool somethingWrong
    // ... stuff happens, possibly setting 'somethingWrong' to true
    if somethingWrong {
        return errors.New("something went wrong")
    } else {
        return nil
    }
}

func main() {
    err := foo()
    if err != nil {
        // something went wrong in the call to 'foo'
        // ... abort? retry?
    } else {
        // 'foo' completed successfully
    }
}
```

For a function returning an *error* and other things, by convention the *error* should be the last return type:

```go
// following convention
func foo() (int, string, error) {
    // ...
}

// breaking convention
func bar() (int, error, string) {
    // ...
}
```
