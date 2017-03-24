# Go interfaces

An ***interface*** specifies a set of method names, along with parameter lists and return types for these named methods:

```go
interface {
    foo(int, string) string      // method named foo; takes an int and a string; returns a string
    bar()                        // method named bar; takes no arguments; returns nothing
    ack([]float32) int           // method named ack; takes a []float32; returns an int
}
```

Any type which has all the methods specified in an interface is considered to ***implement*** that interface.

If we create a variable of an interface type, we can assign values of any implementing type to that variable:

```go
var x interface {
    foo(int)             
    bar() string
}
var j jack
x = j           // compile error if 'jack' does not have all the methods specified in the interface type of variable 'x'
```

Interfaces are data types, and so we can create named interface types with `type`:

```go
type drew interface {
    foo(int)
    bar() string
}

type jack int
type alison float32

func (j jack) foo(a int) {
    // ...bla bla
} 

func (j jack) bar() string {
    // ...bla bla
} 

func main() {
    var d drew
    d = jack(4)        // ok: 'jack' implements 'drew'
    d = alison(2.0)    // compile error: 'alison' does not implement 'drew'
}
```

If a type has additional methods not included in an interface, that doesn't affect whether the type implements the interface.

Whether a type and an interface are defined in the same package doesn't affect whether the type implements the interface. Wherever a type is defined and wherever an interface is defined, the type implements the interface as long as it has the all the methods.

A single type can implement any number of interfaces. Implementing one interface does not affect whether it implements another.

## interface values

We can cast a value to an interface type if the value's type implements the interface. Assuming *jack* implements *drew*, we can cast a *jack* value to a *drew* value. When we do such a cast, the returned interface value is made up of two references: 

 - a reference to the value of the implementing type
 - a reference to the implementing type's method table. 

When we assign a value of an implementing type to an interface variable, it is implicitly cast to a value of that interface type:

```go
var d drew        
var j jack = 4
d = drew(j)              // the 'drew' value is a reference to the 'jack' value and a reference to the method table of 'jack'
d = j                    // same as previous statement, but cast left implicit
```

The zero value of an interface variable is made up of two references to nothing. We can assign an interface variable its zero value by assigning it `nil`:

```go
var d drew
d = jack(4)
d = nil                  // assign zero value to d
```

With an interface value, we can call the methods of that interface (and *only* the methods of that interface). The method of the referenced type is called, and the referenced value is passed as the receiver:

```go
var d drew = jack(r)
d.bar()                  // call bar of 'jack', passing the 'jack' value referenced by 'd' to the receiver
```

Calling methods on a `nil` interface value triggers a panic: without a referenced value, there is no referenced method, and so no actual method to call!

```go
var d drew
d.bar()                  // panic: 'd' is nil, so no way to know which 'bar' to call
```

## type assertions

A ***type assertion*** returns the value referenced by an interface value:

```go
var d drew = jack(4)
var j jack = d.(jack)          // type assertion to get the 'jack' value referenced in 'd'
```

In the above case, it's obvious *d* will reference a *jack* value, but in other cases, what type of value an interface value references may depend on what happens at run time. Therefore, the compiler never presumes to know what type of value is referenced by an interface value. A check is done at runtime every time a type assertion is executed, and if the actual type does not match the asserted type, a panic is triggered:

```go
// assume 'alison' also implements 'drew'
var d drew = jack(4)
a := d.(alison)                // panic: asserted 'alison', but actual type is 'jack'
```

To test whether an interface value references a value of a type without triggering a panic, we can use the multi-return form of type assertion. This form returns both a value of the asserted type and a boolean. If the actual value is of the asserted type, the assertion returns the referenced value and the boolean value `true`. If the actual value is *not* of the asserted type, the assertion returns the zero value of the asserted type and the boolean value `false`:

```go
var d drew = jack(4)
j, ok := d.(jack)              // 'j' assigned jack(4); 'ok' assigned true
a, ok := d.(alison)            // 'a' assigned zero value of 'alison'; 'ok' assigned false
```

With the booleans returned from multi-return type assertions, we can branch on type:

```go
func foo(d drew) {
    j, isJack := d.(jack)
    a, isAlison := d.(alison)
    if isJack {
        // ... do stuff with 'j'
    } else if isAlison {
        // ... do stuff with 'a'
    }
}
```

(We can express the above in a less verbose way with a *type switch*, discussed later.)

## the empty interface

The special empty interface type, written `interface{}`, is an interface with no methods, and so every type is considered to implement it, even unnamed types. Effectively, any value of any type can be cast to an empty interface value:

```go
var x interface{}          // an empty interface variable
x = 5                      // ok
x = "hi"                   // ok
x = jack(8)                // ok
```

To get the value referenced in an empty interface value, we must use type assertions (just as we must with any other interface values).

## reflection

With type assertions, we can test if an interface value references a value of a specific type, but what if we want to know if the type is something more general, like an array, or a slice, or a number type? The special package *"reflect"* gives us the means to query the types of values referenced in interface values at run time, *a.k.a.* to do ***reflection***. With reflection, we can write functions that take in interface values but then branch to handle different types of input differently. The *fmt.Println* function, for example, is a variadic function taking a slice of empty interface values, and it uses reflection to discover the types of these inputs and then create an appropriate text representation for any kind of input.

Reflection is not a commonly used feature, so we won't cover it here, but it's worth mentioning because some parts of the standard library rely upon it.