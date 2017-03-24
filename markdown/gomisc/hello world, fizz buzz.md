## Hello world

The "fmt" package (short for "format", as in formatting text) contains a few functions for displaying text on the console (a.k.a. the command-line, a.k.a. the terminal). The *Println* function displays its arguments as text on the console and adds a newline afterwards (*ln* is short for *line*).

Here now is our first complete Go program:

```
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")   
}
```

Assuming this code is in a file called `hello.go`, navigate at the command line to the containing directory and run the program like so:

```
go run hello.go
```


## FizzBuzz

Here's the FizzBuzz program written in Go:

```
package main

import "fmt"

func main() {
    i := 1
    for i <= 100 {
        by3 := 0 == i % 3      // % has higher precedence than ==
        by5 := 0 == i % 5
        if by3 && by5 {
            fmt.Println("FizzBuzz")
        } else if by3 {
            fmt.Println("Fizz")
        } else if by5 {
            fmt.Println("Buzz")
        } else {
            fmt.Println(i)
        }
        i = i + 1
    }
}
```

(You might notice that the first three cases pass a string to *fmt.Println* but the last case passes an int. How can a function take different argument types in different calls? This will be explained later when we cover *interfaces*.)


