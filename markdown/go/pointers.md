# Go pointers

Much like we can create an array or slice of any type, we can also create a ***pointer*** of any type:

```
var a *int                   // pointer to int
var b *string                // pointer to string
var c *[]string              // pointer to slice of strings
var d *[5]bool               // pointer to 5-element array of bools
```

(We more commonly say '*X* pointer' rather than 'pointer to *X*', but they mean the same thing. Try not to get confused by this verbal inversion!)

A pointer represents a *reference*, *a.k.a.* a memory address. An `*int` value represents a memory address where an `int` is stored; a `*string` value represents a memory address where a `string` is stored; *etc.* The pointed to location can only be a variable, a field within a struct variable, or an index within an array or slice. 

We create a pointer with **`&`**, the ***reference operator***:

```go
var i int
var ip *int = &i             // assign to 'ip' a pointer to 'i'

type cat struct {
    Lives int
    Name string
}
var c cat
var sp *string = &c.Name     // assign to 'sp' a pointer to the field 'Name' of 'c'

var f [10]float32
var fp *float32 = &f[4]     // assign to 'fp' a pointer to index 4 of 'f'
```

(Be clear that, whereas operators normally take *values* as operands, the `&` operator takes a *storage location* as operand. In the expression `&x.y`, the operand is the field *y* itself of struct variable *x*, not the value stored in `x.y`. The `&` operator doesn't care what value is stored at that location: it just wants the address.)

A pointer itself represents an address, not the value stored at that address. To get the value stored at the address represented by a pointer, we use **`*`**, the ***dereferenece operator***:

```go
var i int = 35
var ip *int = &i
var z int = *ip              // assign to 'z' the int at the address represented by the pointer value stored in variable 'ip'
```

Given a pointer variable, we can use `*` to assign a value to the location represented by the stored pointer value:

```go
var i int = 35
var ip *int = &i          // 'ip' points to 'i'
*ip = 7                   // assign 7 to location pointed to by 'ip'
z := i                    // 7
*ip = "hi"                // compile error: cannot assign a string to dereference of an int pointer
```

Try not to get confused by the four meanings of `*`: 

 - in a type specification, `*` means 'make this a pointer'
 - used as a unary operator in an expression, `*` means 'get the value pointed to by this pointer'
 - used as a binary operator, `*` is the multiplication operator
 - used on the target of assignment, `*` means 'store a value at the location referenced by this pointer'

The zero value of a pointer represents the address of nothing and is represented by the reserved word `nil`. Dereferencing a `nil` pointer triggers a panic:

```go
var fp *float32           // initial value is nil
fp = nil                  // assign nil to 'fp'
*fp = 9.3                 // panic! dereferencing a nil pointer
```

## why use pointers?

Three reasons:

**1)** By storing a pointer instead of a value directly, that value can be referenced from multiple places, *e.g.* pointers A, B, and C can all point to the same value D in memory:

```
type todd struct {
    // ... stuff
}

type gina struct {
    t *todd
    i int
    // ... more stuff
}

func main() {
    t := todd{}
    // these three gina values all reference the same todd value...
    g1 := gina{t: &t}
    g2 := gina{t: &t}
    g3 := gina{t: &t}
    t.i = 9             
    b := g1.t.i == g2.t.i == g3.t.i == 9     // true
}
```

Sharing data this way is sometimes useful because changes to the referenced value are seen everywhere it is referenced. (Shared data can also cause problems if you're not careful! It's sometimes easy to forget all the places in code that a piece of data is shared.)

**2)** By passing a pointer to a function, the function can store a new value at the referenced location:

```go
func foo(a *int) {
    *a = 9
}

func main() {
    z := 5
    foo(&z)
    fmt.Println(z)     // prints: 9
}
```

(Be clear that a function's parameters are always local to the function call, and so assigning to a pointer parameter is a change seen only within the call. However, if we assign to the *dereference* of a pointer parameter, the change may be seen outside the call.)

**3)** Structs and arrays come in all sizes: a few bytes up to thousands or even occasionally millions or billions of bytes. No matter what a pointer points to, a pointer value is always just an address, and all addressses within a single system are the same size. On a 32-bit machine, addresses are 32 bits; on a 64-bit machine, addresses are 64 bits. Therefore, it is often more efficient for functions to have pointer parameters instead of struct or array parameters. A function call argument value is always copied in full to its corresponding parameter: for a large struct or array, that can be a lot of bytes to copy; for a pointer, it's always just 32 or 64 bits:

```go
// by taking a pointer, calling the function only requires copying a single pointer rather than 1000 ints
func foo(arr *[1000]int) {
    // ...
}

func main() {
    var arr [1000]int
    foo(&arr)            // pass pointer to the array
}
```

Recall that slices are also a kind of reference: no matter the size of the underlying array, a slice value itself is always just a reference, a length, and a capacity. Because Go has slices, it's rare to use array pointers in Go. The above code would more likely be written:

```go
func foo(arr []int) {
    // ...   
}

func main() {
    var arr [1000]int
    foo(arr[:])          // pass a slice referencing the array
}
```

For structs on the other hand, pointers are more commonly useful:

```go
// each 'ned' value is very large!
type ned struct {
    a [1000]int
    b [1000000]float32
}

func foo(n *ned) {
    // ...
}

func main() {
    var n ned
    foo(&n)       // pass pointer to the ned struct
}
```

## special rules for array pointers and struct pointers

Given a pointer to an array or struct, we can access the elements or fields without explicitly dereferenceing. Go lets us leave the dereference implicit:

```
arr := [5]int{10, 20, 30, 40, 50}
ap := &arr     
z := (*ap)[0]                       // assign 10 to 'z' (dereference 'ap' to get the array it points to, then get index 0)
z = ap[0]                           // z = (*ap)[0]
```

The compiler knows that *ap* is a pointer to an array, not an array itself, so it knows we meant to dereference the pointer first.

Notice we had to put parens around the dereference. Without the parens, `*ap[0]` would be interpreted by the compiler as `*(ap[0])`, which isn't what we want. (The compiler would then complain because `ap[0]` returns an `int`, and the dereference operator can only be used on pointers, not `int`'s.)

We can use a similar shorthand with pointers to structs:

```
type helen stuct {
    a int
    b string
}

h := helen{6, "yo"}
hp := &h
s := (*hp).b                   // assign "yo" to 's' (dereference 'hp' to get the helen struct it points to, then get field 'b')
s = hp.b                       // s = (*hp).b
```

Another special allowance is that we can get a pointer directly from an array or struct value:

```
a := &5                        // compile error: can't get a pointer to a number constant
b := &int(5)                   // compile error: can't get a pointer to an int value
c := &"hi"                     // compile error: can't get a pointer to a string
d := &[5]int{1, 2, 3, 4, 5}    // ok: get a pointer to this new array value
e := &helen{6, "yo"}           // ok: get a pointer to this new struct value
```

## pointers to pointers

Just like we can create arrays of arrays, slices of slices, arrays of slices, and slices of arrays, we can create pointers-to-pointers. For *any* type, we can create a pointer to that type. So we can have pointers-to-pointers, pointers-to-pointers-to-pointers, pointers-to-pointers-to-pointers-to-pointers, *ad infinitum*. However, it's uncommon to need pointers of more than 2 degrees. In fact, even 2-degree pointers aren't very common in Go.

A pointer-to-pointer is a pointer that represents the address of some memory location storing a pointer:

```
var i int = 3
var p *int = &i
var pp **int = &p
var p2 *int = *pp
```

The most common reason to use 2-degree pointers is so that a function can modify the value of a pointer variable outside its scope. Consider this (very artificial) example:

```
func foo(pp **int, p *int) {
    *pp = p                       // assign *int value to the *int variable pointed to by 'pp'
}

func main() {
    i := 5
    var p *int 
    foo(&p, &i)
    z := *p        // 5
}
```

Here's a (slightly) less artifical example:

```
// set *int pointed to by 'pp' to whichever int variable pointed to by 'a' or 'b' has the greater value (tie goes to 'a')
func max(pp **int, a *int, b *int) {
    if *a >= *b {
        *pp = a
    } else {
        *pp = b
    }
}

func main() {
    x := 9
    y := 7
    var p *int
    max(&p, &x, &y)
    z := *p            // 9
}
```

## arrays of pointers and slices of pointers

Arrays and slices of pointers aren't very frequently needed, but cases do come up:

```
var arr [5]*int
i := 3
j := 7
k := 2
arr[0] = &i
arr[1] = &j
arr[2] = &k
```

## pointer methods

As we've said, the receiver of a method can be a named type, but it can also be a *pointer* to a named type:

```
type ken int

func (k *ken) foo() {
    // ...
}

func main() {
    k := ken(5)
    kp := &k       // because (&k) returns a *ken, 'kp' has type *ken
    kp.foo()       // call 'foo' of *ken, passing 'kp' to the receiver
}
```

Types **X** and **\*X** cannot both have a method of the same name:

```
func (k *ken) foo() {
    // ...
}

// compile error! cannot define method 'foo' for both ken and *ken
func (k ken) foo() {
    // ...
}
```

However, given a method defined for **X**, we can call it *via* a **\*X** value, and Go will implicitly do the dereference operation for us: 

```
type ken int

func (k ken) foo() {
    // ...
}

func main() {
    k := ken(5)
    kp := &k
    kp.foo()           // (*kp).foo() 
}
```

This works the other way too. Given a method defined for **\*X**, we can call it *via* an **X** value, and Go will implicitly pass a reference instead of the value itself:

```
type ken int

func (k *ken) foo() {
    // ...
}

func main() {
    k := ken(5)
    k.foo()           // (&k).foo() 
}
```

Be clear that a method defined to receive a pointer always receives a pointer; a method defined to receive a non-pointer always receives a non-pointer!

## pointers and interfaces

If all the methods of an interface are defined for **X**, then both **X** and **\*X** implement the interface.

If all the methods of an interface are defined for **\*X** (or a mix of **\*X** and **X**), then only **\*X** implements the interface.

For example, given an interface with methods *foo()*, *bar()*, and *ack()*:

```
// both X and *X implement the interface
func (x X) foo() {}
func (x X) bar() {}
func (x X) ack() {}
```

If one or more of the methods is defined for **\*X** rather than **X**...

```
// just *X implements the interface
func (x X) foo() {}
func (x *X) bar() {}
func (x X) ack() {}
```

(The reason for this asymmetric rule is quite arcane. In short, the rule avoids some rare scenarios that might surprise and trip us up.)