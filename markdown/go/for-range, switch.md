# Go `for-range` and `switch`

## `for-range` loops

A `for-range` loop makes it convenient to loop through arrays, slices, maps, and strings:

```go
foo := []int{50, 60, 70, 80}
// prints: 0 50, then 1 60, then 2 70, then 3 80
for index, value := range foo {
    fmt.Println(index, value)
}
```

(Note that we can name the variables assigned from `range` anything we want. The most common names used are *i* for the index and *v* for the value.)

Because maps have no sense of order, no guarantee is made about the order in which `for-range` will iterate through the key-value pairs:

```go
foo := map[string]int{"hi": 3, "bye": 5, "yo": 11}
// prints (but not necessarily in this order): "hi" 3, "bye" 5, "yo" 11
for key, value := range foo {
    fmt.Println(key, value)
}
```

Note that `for-range` always expects two assignment targets. If you only need one, use the blank identifier for the other:

```go
foo := []int{10, 20, 30, 40}
// prints: 10, then 20, then 30, then 40
for _, value := range foo {                  // we only care about the values, so we assign the keys to _
    fmt.Println(value)
}
```

Using a `for-range` loop, we can iterate through all the runes that make up a string:

```
s := "hi, 世界"
for r := range s {
    // 'r' is a rune
    fmt.Println(r)
}
```

The above code prints:

```
104          (h)
105          (i)
44           (,)
32           (space)
19990        (世)
30028        (界)
```

## `switch` statements

Given a value, we can use a `switch` statement to branch based on its value: 

```go
var v int
// ...assign a value to 'v'
switch v {
case 5:
    // ... body executed if 'v' equals 5
case 9 + 2:
    // ... body executed if 'v' equals 11
default:
    // ... body executed if 'v' doesn't equal 5 or 11
}
```

Instead of the `switch` above, we could have written this:

```go
var v int
// ...assign a value to 'v'
if v == 5 {
    // ... body executed if 'v' equals 5
} else if v == (9 + 2) {
    // ... body executed if 'v' equals 11
} else {
    // ... body executed if 'v' doesn't equal 5 or 11
}
```

The `switch` form is sometimes preferred simply because it's a bit less verbose.

Including a `default` is optional.

Normally, execution leaves the `switch` after executing a case body. However, if the last statement in a case body is a `fallthrough` statement, the next case is also executed:

```go
v := 11
// prints: "hi", then "bye"
switch v {
case 5:
    fmt.Println("yo")
case 9 + 2:
    fmt.Println("hi")
    fallthrough                // execution 'falls through' into the default case
default:
    fmt.Println("bye")
}
```

## type `switch` statements

Given an interface value, we can use a ***type switch*** to branch on its referenced value's concrete type:

```go
var foo = interface{}
// ... 'foo' could be assigned anything!
switch v := foo.(type) {
case int:
    // ... body executed if 'foo' holds an int; 'v' in this scope is an int
case string:
    // ... body executed if 'foo' holds a string; 'v' in this scope is a string
case bool, float32:
    // ... body executed if 'foo' holds a bool or float32; 'v' in this scope is an interface{}
default:
    // ... body executed if 'foo' is neither an int nor a string; 'v' in this scope is an interface{}
}
```

Including a `default` is optional.

A type switch cannot use `fallthrough`.