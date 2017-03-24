
## Defining types

A `type` statement defines a new data type.

A defined type is only accessible in the scope where it is defined. Usually, however, we want defined types to be accessible globally, so we usually put `type` statements at the top-level of code (meaning outside any function).

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

Here we're using float64's to represent very different kinds of things: money and a measure of weight. The withdraw function is meant to operate only on quantities of money, but if we passed a weight value as argument on accident, the compiler will have no idea we made a mistake. 

Let's try defining separate money and weight types:

```
type money float64
type kilogram float64

func withdraw(n money) {
    // ...
}

var bankBalanace money = 3.50
var weightKG kilogram = 7.8
```

Our money and kilogram types are really just float64's, but the compiler considers them to be separate types: if you try passing a kilogram value to *withdraw*, the compiler will give you an error because *withdraw* only takes money arguments.

(Remember that number constants have no specific type. Because, say, a kilogram is really a float64, we can assign any valid float64 number constant to a kilogram variable.)



## structs (structures)

A struct (short for structure) is a data type composed of named values of other types:

```
// define foo to be a struct type with an int named 'a', a string named 'b', and a float32 named 'c'
type foo struct{
    a int
    b string
    c float32
}
```

Having defined a struct type *foo*, we can create a *foo* variable and give it a value:

```
var bar foo = foo{a: 7, b: "hi", c: 62.3}
bar := foo{a: 7, b: "hi", c: 62.3}           // shorthand for previous line
bar := foo{b: "hi", c: 62.3, a: 7}           // the elements of the struct can be in any order
bar := foo{b: "hi", a: 7}                    // the element 'c' is omited and so defaults to its zero value (0.0)
bar := foo{7, "hi", 62.3}                    // if we omit names, the values must all be present and in their defined order (in this case: a b c)
bar := foo{}                                 // all elements omited and so default to their zero values
```

We can get and set the elements of a struct value using the dot operator:

```
bar := foo{a: 7, b: "hi", c: 62.3}
var a int = bar.a                            // assign 7 to variable 'a'
var b string = bar.b                         // assign "hi" to variable 'b'
var c float32 = bar.c                        // assign 62.3 to variable 'c'

bar.a = 2                                    // set element 'a' to 2
bar.b = "bye"                                // set element 'b' to "bye"
bar.c = -8.5                                 // set element 'c' to -8.5
```

(Note that . is used for two similar but different purposes: accessing elements of structs and accessing elements of imported packages.)

Let's give a bit more realistic struct type example:

```
type Person struct {
    Name string
    Weight float32
    Address string
    DateOfBirth string
}

p := Person{Name: "Mike", Weight: 182.7, DateOfBirth: "December 9th, 1986"}
p2 := Person{Name "Tristan", DateOfBirth: "March 17th, 1995"}
fmt.Println(p.Name)    // display "Mike"
fmt.Println(p2.Name)   // display "Tristan"
```

(There are many different ways to represent dates and times. For simplicity, we just use strings.)
