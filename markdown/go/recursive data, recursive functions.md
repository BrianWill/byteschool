# Go recursion

## recursive data

Something which is ***recursive*** is defined partly in terms of itself.

A struct cannot be directly recursive, meaning it cannot contain a field of its own type:

```go
type Cat struct {
    Name string
    Lives int
    Mother Cat          // compile error: a struct cannot contain itself
}
```

The obvious problem with the above struct is that every *Cat* would contain a *Cat* which would contain another *Cat* which would contain another *Cat*...*ad infinitum*. Any *Cat* we create would be infinite in size!

What we can do however is create structs that are *indirectly* recursive, meaning recursive through a reference:

```go
type Cat struct {
    Name string
    Lives int
    Mother *Cat         // ok
}
```

A pointer is just an address, and a pointer can be `nil`. So if we create a *Cat*, it maybe references another *Cat*, or maybe it references itself (ignore the question of how a cat could be its own mother!), or maybe it references nothing. If a Cat contains a *reference* to another Cat, the existence of a *Cat* does not require an infinite chain of *Cats*. 

Likewise, whereas a *Cat* cannot contain an array of *Cats*, it can contain a *slice* of *Cats*:

```go
type Cat struct {
    Name string
    Lives int
    Children []Cat      // ok
}
```

Because a slice can be empty or `nil`, creating a value of the above version of *Cat* doesn't require creating an infinite chain of *Cats*.

## recursive functions

A function that calls itself is recursive.

Remember that each call to a function has its own set of local variables. Consequenty, when a function calls itself, the new call has its own separate set of the locals.

We generally don't want a function to call itself repeatedly forever in an infinite loop:

```
func foo() {
    foo()               // 'foo' will call itself forever!
}
```

The general trick with recursive functions is that the recursive calls should be conditional so as to break the chain of recursive calls at some point:

```
func foo(x int) {
    if x > 0 {
        fmt.Println(x)
        foo(x - 1)
    }
}

func main() {
    foo(4)              // prints: 4, then 3, then 2, then 1
}
```

In principle, we don't need `for` statements because we could just use recursion to loop:

```go
func printSlice(sl []int) {
    if len(sl) == 0 {
        return
    }
    fmt.Println(sl[0])
    printSlice(sl[1:])
}

func main() {
    // prints: 1, then 2, then 3, then 4, then 5
    vals := []int{1, 2, 3, 4, 5}
    printSlice(vals)
}
```

Conversely, in principle we never need recursion because we could always accomplish the same things with loops. However, some problems are more simply solved with recursion, and some problems are more simply solved with loops.

Recursive functions are particularly useful when working with recursive data:

```go
type Cat struct {
    Name string
    Lives int
    Children []Cat
}

// this won't recurse infinitely because at some point it reaches Cat values with no children
func printCatFamilyTree(c Cat) {
    fmt.Println(c.Name)
    for _, v := range c.Children {
        printCatFamilyTree(v)
    }
}

func main() {
    c := Cat{Name: "Mittens", Lives: 9}
    // ... give Mittens many cat descendents
    printCatFamilyTree(c)       // prints out the name of this cat and all of its descendents
}
```

(Above, if the *Children* slice of a *Cat* referenced the same array as one of its ancestors, this would create a 'loop' in our family tree. This wouldn't really make any sense---hopefully no cat shares any children with its ancestors---but understand that such a 'loop' would make *printCatFamilyTree* recurse forever.)