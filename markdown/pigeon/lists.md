# Pigeon lists

A ***list*** in Pigeon is a value which itself is made up of any number of other values. The values in a list are known by their numeric indexes. The first element has index 0, the second has index 1, the third has index 2, the fourth has index 3, *etc.*

The `list` operator returns a new list made up of the operands:

```
(list)                         # return a list with no values
(list 6 "hi" 78)               # return a list with three values: 6, "hi", 78
```

The `get` operator retrieves the value of a list at a given index:

```
var foo
as foo (list 6 "hi" 78)
(get foo 2)                    # return 78 (the value at index 2 of the list stored in variable 'foo')
```

The `set` operator modifies the value of a list at a given index:

```
var foo
as foo (list 6 "hi" 78)
(get foo 0)                    # 6
(set foo 0 "bye")    
(get foo 0)                    # "bye"
```

The `len` (length) operator returns the number of values within a list:

```
var bar
var foo
as bar (list)              
as foo (list 6 "hi" 78)    
(len bar)                      # 0
(len foo)                      # 3
```

The `append` operator adds a value to the end of a list, increasing the list's length by one:

```
var foo
as foo (list 6 "hi" 78)
(append foo 900)
(get foo 3)                    # 900
(len foo)                      # 4
```

## references vs. values

You may have wondered how a single variable can store any kind of value. Strings, numbers, booleans, and lists all take up different amounts of memory, so how can one location in memory store any kind of thing? Well, a variable in Pigeon does not actually store a value directly. Instead, a variable stores a memory address, a ***reference*** to where an actual value is located elsewhere in memory. 

Likewise, a list stores references rather than directly store actual values.

When multiple references refer to the same unmodifiable value, there's nothing to worry about. When multiple references refer to a modifiable value, however, it's important to be aware that changes *via* one reference will show up when we read the value *via* another reference.

Nearly all operations in Pigeon leave their input values unmodified. The `add` operator, for example, produces a new, separate output value, leaving its input values unmolested. The only two exceptions are `set` and `append`, which modify their list input. A list is the only kind of value in Pigeon that can be modified:

```
var foo
var bar
as foo (list 6 "hi" 78)
as bar foo                     # 'bar' will now reference the same list as 'foo'
(set bar 1 "yo")               # modify index 1 of the list referenced by 'bar'
(get foo 1)                    # "yo"
```

Again, a list actually stores references, not values directly, so it's possible for multiple list indexes to reference the same value:

```
var foo
var bar
as foo (list 6 "hi" 78)
as bar (list)
(append bar foo)
(append bar "yo")
(append bar foo)
(get bar 0)                    # returns the same list referenced by 'foo'          
(get bar 1)                    # returns "yo"
(get bar 2)                    # returns the same list referenced by 'foo'          
```

It's even possible for a list index to reference the same list that contains it, *i.e.* a list can contain itself!

```
var foo
as foo (list 6 "hi" 78)
(append foo foo)
(get foo 3)                    # returns the same list referenced by 'foo'
``