# Defining types in Go

## `type` statements

A `type` statement defines a new data type.

We can only refer to a type by name in the scope where it is defined. Usually, however, we want defined types to be accessible globally, so we usually put `type` statements at the top-level of code (meaning outside any function).

```
type foo int        // create a new data type named 'foo' which is just like an int
```

It may seem odd to define a data type that is just like an existing type, but doing so can be useful. Consider this example:

```
func withdraw(n float64) {
    // ...
}

var bankBalance float64 = 3.50   
var weightKG float64 = 7.8       
```

Here we're using `float64`'s to represent very different kinds of things: money and a measure of weight. The withdraw function is meant to operate only on quantities of money, but if we passed a weight value as argument on accident, the compiler will have no idea we made a mistake. 

Now let's define separate money and weight types:

```
type money float64
type kilogram float64

func withdraw(n money) {
    // ...
}

var bankBalanace money = 3.50
var weightKG kilogram = 7.8
```

Our *money* and *kilogram* types are really just `float64`'s, but the compiler considers them to be separate types: if you try passing a *kilogram* value to *withdraw*, the compiler will give you an error because *withdraw* only takes *money* arguments.

(Remember that number constants have no specific type. Because, say, a *kilogram* is really a `float64`, we can assign any number constant that's a valid `float64` value to a *kilogram* variable.)

## structs

A ***struct*** (short for 'structure') is a data type composed of named values of other types:

```
// define 'foo' to be a struct type with an int named 'a', a string named 'b', and a float32 named 'c'
type foo struct{
    a int
    b string
    c float32
}
```

Having defined a struct type *foo*, we can create a *foo* variable and give it a value (denoted by the type name suffixed with `{}`):

```
var bar foo
bar = foo{a: 7, b: "hi", c: 62.3}           // assign 'bar' a new 'foo' value
bar = foo{b: "hi", c: 62.3, a: 7}           // the elements of a struct value can be written in any order
bar = foo{b: "hi", a: 7}                    // the element 'c' is omited and so defaults to its zero value (0.0)
bar = foo{}                                 // if we omit all elements, they all default to their zero values
bar = foo{7, "hi", 62.3}                    // if we omit names, the values must all be present and in their defined order (in this case: a b c)
```

We can retrieve and set the elements of a struct value using the dot operator:

```
var bar foo = foo{a: 7, b: "hi", c: 62.3}    
var x int = bar.a                            // assign 7 to variable 'x'
var y string = bar.b                         // assign "hi" to variable 'y'
var z float32 = bar.c                        // assign 62.3 to variable 'z'

bar.a = 2                                    // set element 'a' to 2
bar.b = "bye"                                // set element 'b' to "bye"
bar.c = -8.5                                 // set element 'c' to -8.5
```

(Note that we've already seen `.` used for two different purposes: accessing elements of structs and accessing elements of imported packages.)

Here's a more realistic struct type example:

```
type Person struct {
    Name string
    Weight float32
    Address string
}

// 'p' and 'p2' are both inferred to be of type 'Person'
p := Person{Name: "Mike", Weight: 182.7}
p2 := Person{Name "Tristan"}
x := p.Name        // assign "Mike" to 'x'
y := p2.Name       // assign "Tristan" to 'y'
```