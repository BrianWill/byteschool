# data types

StaticPigeon has these built-in data types:

    I               (64-bit signed integer)
    F               (64-bit floating point)
    Byte            (8-bit unsigned integer)
    Str             (string)
    Bool            (boolean)
    L               (list)
    M               (map)
    A               (array)
    S               (slice)
    P               (pointer)
    Fn              (function)
    Any             (catch-all supertype)
    Err             (error)

As a rule, type names begin with capital letters; non-type names cannot begin with capital letters.

# static typing

In a statically-typed language:

 1. every variable (including globals and parameters) must have a designated type
 2. every function must designate its return type

The compiler aborts if the wrong kind of value is:

 1. assigned to a variable
 2. used in an operation
 3. passed to a function
 4. returned from a function

```
// alice takes two integers and returns an integer
func alice x I y I : I
    return (add x y)

// bob takes an integer and returns a string
func bob a I : Str
    if (gt a 10)
        return "hi"          // OK
    else 
        return 3             // compile error: cannot return an integer from bob     

func main
    locals ted I             // ted is an integer variable
    as ted (alice 8 2)       // OK
    as ted "hi"              // compile error: cannot assign a string to ted
    as ted (alice "hi" 2)    // compile error: cannot pass a string as first argument to alice
    as ted (add 4 "hi")      // compile error: cannot use a string in an add operation
```

# default local values

When created, a local variable starts with a default value appropriate for its type:

- integer and byte variables default to 0
- floating-point variables default to 0.0
- boolean variables default to false
- string variables default to an empty string
- list variables default to an empty list
- map variables default to an empty map
- array variables default to an array with elements having the default value of their type
- slice variables default to an empty slice
- function, pointer, Any, and Err variables default to nil

# values vs references

Whereas all variables in DynamicPigeon are references, variables of some types in StaticPigeon store values directly:

- I         (integer)
- F         (floating-point)
- Byte      (byte)
- Bool      (boolean)
- A         (array)

These variable types store references:

- Str       (string)
- L         (list)
- M         (map)
- S         (slice)
- Fn        (function)
- P         (pointer)
- Any       (catch-all supertype)
- Err       (error)

# multi-return functions

A function in StaticPigeon can return multiple values:

```
// alice returns an integer and a string
func alice : I Str
    return 9 "hi"
```

A multi-return function cannot be called where a single value is expected, but the values can be assigned to multiple targets in an assignment:

```
func main
    locals a I b Str
    (alice)                 // OK (the return values are discarded)
    as a (alice)            // compile error: alice returns two values, not just one
    as a b (alice)          // first returned value assigned to a, second to b
```

# lists

In StaticPigeon, a list must specify the type of its elements, *e.g.* a list of integers, a list of strings, a list of booleans, *etc.* As far as the compiler is concerned, a list of *X*'s is a different type than a list of *Y*'s, and the compiler will enforce that a list of X's will only hold *X* values.

A list's element type is denoted in angle brackets after the `L`:

```
func main
    locals x L<I> y L<Str> z I     // x is an empty list of integers, y is an empty list of strings
    as x y                         // compile error: cannot assign a list of strings to a list of integers
    (append x 3)                   // OK
    (append x false)               // compile error: cannot append a boolean to a list of integers
    (append y "hi")                // OK
    as z (get x 0)                 // OK
    as z (get y 0)                 // compile error: get from y returns a string, not an integer
```

# maps

In StaticPigeon, a map must specify the type of its keys and values, *e.g.* a map with string keys and boolean values. For two maps to be the same type, they must have the same types of keys and values.

A map's key and value types are denoted in angle brackets after the `M`:

```
func main
    locals x M<Str Bool> y M<I Str> z Bool
    as x y                           // compile error: cannot assign a M<I Str> to a M<Str Bool>
    (set x "hi" true)                // OK
    (set x "hi" 3)                   // compile error: x can only have boolean values
    (set y 4 "yo")                   // OK
    as z (get x "hi")                // OK
    as z (get y 4)                   // compile error: get from y returns a string, not a boolean     
```

# structs

Much like a function is an operation we define in code, a `struct` ('structure') is a data type we define in code. A struct is made up of zero or more other elements, each with a name and type.

A struct is defined outside of any function and itself given a name (which must begin with a capital letter):

```
// a struct named Cat with three elements: 'name' (a string), 'weight' (a float), and 'age' (an integer)
struct Cat
    name Str
    weight F
    age I
```

We can create a variable of a struct type and access its elements with `get` and `set`. (The values of a local struct variable start with the default values for their types.)

```
func main
    locals x Cat y Cat
    (set x age 9)                 // set the age of Cat x to 9
    (print (get x age))           // print 9
    (print (get y age))           // print 0
    as x y                        // all of x's elements set to match those of y
    (print (eq x y))              // print true
```

As always with `get` and `set`, we can use the `.` shorthand:

```
// same as previous
func main
    locals x Cat y Cat
    as x.age 9
    (print x.age)
    (print y.age)
    as x y
    (print (eq x y))
```

Be clear that, once defined, a struct is a data type like any other. We can give a function struct parameters and return types, and we can create lists and maps of a struct type.

We can create a struct value by using its type name like an operator, passing values for each element (in the same order they are defined):

```
func main
    locals x Cat
    as x (Cat "Mittens" 13.2 8)
```

# arrays

An array is like a list, but it has a fixed number of elements (and thus the elements can be stored contiguously in memory, which is generally more efficient). The number of elements must be specified in angle brackets along with the type. The elements of an array start out with the default of their type:

```
func main
    locals x A<I 6>            // x is an array of 6 integers
    (set x 0 -7)               // set first element of the array to -7
    (print (get x 0))          // print -7
```

The size of an array is part of its type, so arrays of different size are not the same type:

```
func main
    locals x A<I 6> y A<I 6> z A<I 4>
    as x y                      // copy all elements of y to x
    as x z                      // compile error: cannot assign an A<I 4> to an A<I 6>
```

# slices

A slice value represents a subrange of elements of an array. It is composed of three values: 

 - an address (the location of an element within the array)
 - a length (an integer), the number of elements that make up the subrange of the array
 - a capacity (an integer), the number of elements from the referenced element through the end of the array

The length cannot be greater than the capacity.

The default slice value references no array and has a length and capacity of zero.

# pointers

A pointer is a value that represents the address of a location in memory. Like with lists and maps, there is no one pointer type: rather, there is a pointer to *X*, where *X* is the type of value stored at the location represented by the pointer.

A local pointer variable defaults to the special value `nil`, which points to nothing.

The `ref` ('reference') operator returns a pointer representing the location of a variable.

The `dr` ('dereference') operator returns the value at the location represented by a pointer.

A pointer's type is denoted in angle brackets after the `P`.

```
func main
    locals p P<I> n I s Str
    (print p)                  // print nil
    as p (ref n)               // assign pointer representing i to p
    as n 8
    (print (dr p))             // print 8
    as s (dr p)                // compile error: (dr p) returns an integer, not a string
    as p (ref 3)               // compile error: can only use ref on variables, not just any value
```

We can only use `ref` to get the address of:

 - a variable
 - an element of an array variable
 - an element of a struct variable

```
func main
    locals c Cat p P<Str>
    as p (ref c.name)          // assign to p a pointer to the name of c
```

(This limitation stems from implementation details of how StaticPigeon manages memory. It's generally not very useful to get pointers of non-variables, anyway.)

# methods

A method is a special kind of function which 'belongs' to the struct type of its first parameter.

Multiple structs can have a method of the same name, *e.g.* structs Dog and Cat can both have a method 'sleep'. 

A method is called like a normal function except the method name is prefxied with a dot:

```
// assume we have a Dog struct and Cat struct

method sleep c Cat : Str
    return "zzzzzzzzzzzzzzzz"

method sleep d Dog
    (print "zzzzzzz")

func main
    locals c Cat d Dog
    (.sleep c)                 // call the sleep method of Cat
    (.sleep d)                 // call the sleep method of Dog
```

Methods by themselves do nothing we couldn't do with normal functions, but they relate to interfaces.

# interfaces

An `interface` is a data type defined as a set of method *signatures*. A method signature consists of a method name, a list of zero or more parameter types, and a list of zero or more return types.

Any struct with methods matching all of an interface's method signatures is considered to 'implement' the interface, and therefore values of that struct type are considered valid values of the interface.

```
struct Dog
    name Str
    weight F

struct Lamp
    on Bool
    brightness F
    weight F

struct Poop
    weight F

struct Food
    weight F

interface Eater
    eat Food : Poop

method eat d Dog f Food : Poop
    as d.weight (add d.weight f.weight)   // increaes the Dog's weight by weight of the Food
    return (Poop f.weight)

func main
    locals d Dog l Lamp e Eater
    as e d                          // OK (Dog implements Eater)
    as e l                          // compile error (Lamp does not implement Eater)
    (.eat e (Food 1.2))             // call eat method of Dog
    (print e.name)                  // compile error: e is an Eater, not a Dog
```

When we assign the Dog value to Eater variable 'e', the variable references the Dog value, but the compiler considers 'e' to be an Eater, not a Dog. As far as the the compiler is concerned, it doesn't know specifically what kind of Eater 'e' references: it could be a Dog or it could be some other implementer of Eater. Therefore, the compiler only lets us call the methods included in Eater on 'e'.

# typeswitch

To get the struct value referenced by an interface value as its own type, we need `typeswitch`.

```
// assume both structs Dog and Cat implement interface Eater
func erin e Eater
    typeswitch e
    case x Dog                      // this case is executed if e references a Dog
        (print x.name)              // x here is a Dog
    case y Cat                      // this case is executed if e references a Cat
        (print y.name)              // y here is a Cat
    default                         // the default executed if e references neither a Dog nor Cat
        (print e)                   // e here is an Eater
```

Only the case with the matching struct type is executed, and the struct value is assigned to that case's variable (which only exists within the case).

If a case introduces a new local variable with the same name as one that already exists, the other variable is effectively inaccessible in the case. (If this is ever a problem, just make the names different.)

# foreach

A `foreach` loop is a more convenient way to loop through the indexes and elements of a list, map, array, or slice:

```
func jon x L<Str>
    foreach i I s Str x
        (print i s)       
```

The above is equivalent to:

```
func jon x L<Str>
    locals i I s Str
    while (lt (len x))
        as s x[i]
        (print i s)
        as i (inc i)
```

Like the cases of a typeswitch, a foreach introduces new local variables that only exist within its body.

# localfunc, closures

A `localfunc` is a function defined at the top of another function. A localfunc is only callable from its containing function, but it has access to the variables of its containing function.

```
func main
    locals z I
    // create a function and assign it to 'f'
    localfunc dan a I : I
        return (add a 3 z)
    as z 9
    (print (dan 8))               // print 20 
```

```
func main
    locals a I b I
    localfunc tim : I
        locals x I
        as x 2
        return (add x a)
    as a 3
    as b 11
    (print (mul (tim) b))          // print 55
```


```
// 'oliber' returns a function taking no parameters and returning an integer
func oliver : Fn<: I>
    locals a I
    localfunc b : I
        // 'a' is from enclosing call
        as a (add a 3)
        return a
    as a 2
    return b

func main
    locals x Fn<: I> y Fn<: I>

    as x (oliver)   // assign closure to 'x' (function returned by 'oliver' retains variable 'a')
    (x)             // 5
    (x)             // 8
    (x)             // 11

    as y (oliver)   // assign a different closure to 'y' (same function but a different retained variable 'a')
    (y)             // 5
    (y)             // 8
    (y)             // 11

    (x)             // 14
    (x)             // 17
    (y)             // 14
    (y)             // 17
```

# panics, defer, recover


# bitwise operators


# goroutines

# channels


# imports


func fmap [L Y] fn [F Y X] li [L X]
    return (map fn li)

// [Either Str X] -> [Either Str Y]
func fmap [Either Str Y] fn [F Y X] li [Either Str X]
    return (map fn li)

partial apply types

part apply out of order, eg second param but not first



contract Foo
    foo [F Me]

func foo Str     // Str implements Foo
    return "hi"


contract Foo
    foo [F Me Me]

func foo X x X   // everything implements Foo
    return x


contract Foo
    foo [F [Bar X Me]]
    // implementor must have foo matching this exactly but for Me replaced


func foo N [Bar Str I]       // does not make I implementor of 
    //

func foo N [Bar Bool I]      // version of foo called when first param of Bar is a Bool
    //


// given Foo value, this is always the version called when Foo is an I?
func foo N [Bar X I]         // need catch all case for I to implement Foo
    //


// most specific takes precedence
// if args match multiple functions, some from other packages, ambiguity must be 
// resolved at call site by qualifying the package name


contract Foo
    foo [F [Bar Me X]]



contract Foo
    foo [F [Me X] 

contract Foo
    foo [F [Me X Y]

contract Foo
    foo [F [Me X Str] 

contract Foo
    foo [F Me Str X]








func foo I a I b I c I

    as 'bar (foo -na 2 -na)     // partial application, -na (not applied) stands in for missing params
    (bar 4 1)                   // (foo 4 2 1)


    as 'bar (foo -p 4)          // partial application, last two params omitted




// package cannot have two functions of same name if any call might be ambiguous


// what if ambiguity of funcs form two separate contracts? how can type implement both?
    how common is this scenario? any workaround?

    if exact match, then no problem, right?


can use `-implement` to create function that *only* implements a specific contract signature


func foo I Str
    -implement Foo   // this function only implements contract Foo


cannot have ambiguity between implements func and any non-implements func (don't want accidents)


resolve ambiguity of which contract's method you're calling by specifying contract after name:


(foo Bar x y)      // calling foo of contract Bar



contract Functor
    fmap [Me Y] [F X Y] [Me X]

func fmap [IO Y] fn [F X Y] io [IO X]
    IO (fn (val io))


func fmap [F Z Y] a [F X Y] b [F Z X]
    fn Z y Y
        a (b y)


optionally, we can state what types implement what contracts, and the compiler will give us errors if these stated facts are not true