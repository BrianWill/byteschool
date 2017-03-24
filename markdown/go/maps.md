# Go maps

A *set* is a collection of values in which every value is unique. A set has no sense of order: unlike in a slice or array, there is no first value, last value, or anything in between; each value simply exists in the set or doesn't.

A ***map*** is a set in which the values are called *keys* and each key has another associated value. A key and its associated value are called a *key-value pair*. A key must be distinct from every other key in the map, but there is no similar requirement for the associated values: an associated value can be equal to any other associated value or key in the map.)

Like arrays and slices, maps in Go are typed:

```go
var x map[string]int               // variable 'x' is a map with string keys and int values
var y map[uint]bool                // variable 'y' is a map with uint keys and bool values
var z map[*float32]byte            // variable 'z' is a map with *float32 keys and byte values
```

While the specified value type can be anything, the key type cannot be a function, slice, or map. (These things cannot be compared for equality with `==`, so it can't be determined when values of these types are unique.)

Map variables are just references. To create an actual map, use the built-in `make`:

```go
var foo map[string]int             // variable 'foo' starts out nil
foo = make(map[string]int)         // assign to 'foo' a map with string keys and int values
```

A map created with `make` starts out empty. To add a key-value pair, we assign an associated value to the key using `[]` on the map. If the key already exists in the map, the assignment gives the key a new associated value. 

```go
foo := make(map[string]int)
foo["hi"] = 3                      // in the map 'foo', add the key "hi" with value 3
foo["bye"] = 5                     // in the map 'foo', add the key "bye" with value 5
foo["hi"] = -9                     // in the map 'foo', set the key "hi" to the value -9
```

The built-in function `len` returns the number of key-value pairs in a map:

```go
foo := make(map[string]int)
a := len(foo)                      // 0
foo["hi"] = 3                      // in the map 'foo', add the key "hi" with value 3
foo["bye"] = 5                     // in the map 'foo', add the key "bye" with value 5
foo["hi"] = -9                     // in the map 'foo', set the key "hi" to the value -9
b := len(foo)                      // 2
```

The built-in function `delete` removes a key-value pair from a map:

```go
foo := make(map[string]int)
a := len(foo)                      // 0
foo["hi"] = 3                      // in the map 'foo', add the key "hi" with value 3
foo["bye"] = 5                     // in the map 'foo', add the key "bye" with value 5
foo["hi"] = -9                     // in the map 'foo', set the key "hi" to the value -9
b := len(foo)                      // 2
delete(foo, "bye")                 // in the map 'foo', remove the key "bye" and its associated value
c := len(foo)                      // 1
```

We use `[]` to retrieve the associated value of a key. If no such key exists in the map, we get back a zero value:

```go
foo := make(map[string]int)
foo["hi"] = 3                      // in the map 'foo', add the key "hi" with value 3
a := foo["hi"]                     // 3
b := foo["yo"]                     // 0 (the map has no key "yo")
```

A key can have a zero value associated with it, so to really determine whether a map contains a key, we need the multi-return form of `[]`, which also returns a boolean (`true` indicating the key exists):

```go
foo := make(map[string]int)
foo["hi"] = 3                      // in the map 'foo', add the key "hi" with value 3
a, ok := foo["hi"]                 // 3, true
b, ok := foo["yo"]                 // 0, false
```

Instead of `make`, we can create a map by specifying initial values inside `{}`:

```go
a := map[string]int{}                      // a new empty map of strings keys and int values
b := map[string]int{"hi": 3}               // a new map with one key-value pair
c := map[string]int{"hi": 3, "bye", 5}     // a new map with two key-value pairs
```

(Remember that maps have no sense of order, so it doesn't matter in which order we write the key-value pairs.)

Unlike slices and arrays, maps cannot be compared for equality using `==`.