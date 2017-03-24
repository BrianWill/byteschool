# Go methods

Named types (any type defined with `type`) can be given ***methods***. A method is a function associated with a data type, such that a value of that type is passed to the function as its *receiver*. Consider this program:

```go
import "fmt"

type jack int

// a method of jack called 'foo' with a receiver variable 'j'
func (j jack) foo() {
    fmt.Println(j)
}

func main() {
    var x jack  = 5
    x.foo()             // call method 'foo' of jack, passing the value of x to the receiver
}
```

Really, methods are just like regular functions but with one special parameter called the 'receiver'. In a method call, the argument for the receiver is specified before a dot before the method name. 

Methods can take other parameters and return values, just like normal functions:

```go
func (j jack) bar(a int) int {
    return int(j) + a
}

func main() {
    var x jack = 5
    y := x.bar(2)     // 7
}
```

Whereas we cannot have multiple functions of the same name in the same package, any number of types can all have a method of the same name. When we call a method, the compiler knows which method we're calling by the type of the receiver argument:


```go
type jack int
type alison float32

func (j jack) foo() {
    fmt.Println(j)
}

func (a alison) foo() {
    fmt.Println(a + 1)
}

func main() {
    var j jack = 3
    var a alison = 9.2
    j.foo()             // prints: 3
    a.foo()             // prints: 10.2
}
```

Methods must be defined in the same package as their type. So if I define type *jack* in package *A*, I cannot give it more methods in package *B*.
