# Pigeon lists

A ***list*** in Pigeon is a value which itself is made up of any number of other values. The values in a list are known by their numeric indexes. The first element has index 0, the second has index 1, the third has index 2, the fourth has index 3, *etc.*

The `list` operator returns a new list made up of the operands:

```
function main
    locals x
    (print (list))                  // print a list with no values
    (print (list 6 "hi" 78))        // print a list with three values: 6, "hi", 78
```

The `get` operator retrieves the value of a list at a given index:

```
function main
    locals x
    as x (list 6 "hi" 78)
    (print (get foo 2))         // print 78 (the value at index 2 of the list stored in variable x)
```

The `set` operator modifies the value of a list at a given index:

```
function main
    locals x
    as foo (list 6 "hi" 78)
    (print (get foo 0))          // print 6
    (set foo 0 "bye")    
    (print (get foo 0))          // print "bye"
```

The `len` (length) operator returns the number of values within a list:

```
function main
    locals x y
    as x (list)              
    as y (list 6 "hi" 78)    
    (print (len x))              // print 0
    (print (len y))              // print 3
```

The `append` operator adds a value to the end of a list, increasing the list's length by one:

```
function main
    locals x
    as x (list 6 "hi" 78)
    (append foo 900)
    (print (get foo 3))           // print 900
    (print (len foo))                     // print 4
```

## references vs. values

You may have wondered how a single variable can store any kind of value. Strings, numbers, booleans, and lists all take up different amounts of memory, so how can one location in memory store any kind of thing? Well, a variable in Pigeon does not actually store a value directly. Instead, a variable stores a memory address, a ***reference*** to where an actual value is located elsewhere in memory. 

Likewise, a list stores references rather than directly store actual values.

When multiple references refer to the same unmodifiable value, there's nothing to worry about. When multiple references refer to a modifiable value, however, it's important to be aware that changes *via* one reference will show up when we read the value *via* another reference.

Nearly all operations in Pigeon leave their input values unmodified. The `add` operator, for example, produces a new, separate output value, leaving its input values unmolested. The only two exceptions are `set` and `append`, which modify their list input. A list is the only kind of value in Pigeon that can be modified:

```
function main
    locals x y
    as x (list 6 "hi" 78)
    as y x                     // y will now reference the same list as x
    (set y 1 "yo")             // modify index 1 of the list referenced by y
    (print (get x 1))          // print "yo"
```

Again, a list actually stores references, not values directly, so it's possible for multiple list indexes to reference the same value:

```
function main
    locals x y
    as x (list 6 "hi" 78)
    as y (list)
    (append y x)                
    (append y "yo")
    (append y x)                
    (print (get y 0))           // print the same list referenced by x
    (print (get y 1))           // print "yo"
    (print (get y 2))           // print the same list referenced by x
```

It's even possible for a list index to reference the same list that contains it, *i.e.* a list can contain itself!

```
function main
    locals foo
    as foo (list 6 "hi" 78)
    (append foo foo)
    (print (get foo 3))           // print the same list referenced by foo
```

## maps

A ***map*** in Pigeon is a value which itself is made up of ***key-value pairs***. Each key-value pair consists of a key (a string or number) and its associated value (which may be of any type). Each key in a map must be unique amongst the other keys because it is the key which uniquely identifies each key-value pair.

The `map` operator creates a new map. The `set` operator creates or modifies a key-value pair in the map. The `get` operator retrieves the value associated with a given key. The `len` operator returns the number of key-value pairs in a map:

```
function main
    locals x 
    as x (map)                // assign a new, empty map to x
    (set x "hi" 6)
    (set x "bye" "yo")
    (print (get x "hi"))      // prints 6
    (print (len x))           // prints 2
```

We can specify key-value pairs when we create a map:

```
function main
    locals x
    // a new map with two key-value pairs: key "hi" with value 6 and key "bye" with value "yo"
    as x (map "hi" 6 "bye" "yo")
```

Like a list, a map is mutable, so if two variables reference the same map, changes *via* either variable affect the same map.

## special `[]` syntax for get and set

Because getting and setting from lists and maps is particularly common, we have shorthand syntax for `get` and `set`:

```
function main
    locals x
    as x (list 86 "hi")
    (print x[0])               // (print (get x 0)) 
    as x[1] "bye"              // (set x 1 "bye")
    (print x[(sub 9 8)])       // (print (get x (sub 9 8))) 
```

We can use any expression in the brackets to specify the index/key.

Notice that an assignment statement is used in place of a `set` operation. (This is not really any more compact than just using `set`, but we introduce it here because this mirrors how `set` is expressed in most other languages.)