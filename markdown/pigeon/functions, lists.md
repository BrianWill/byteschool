
## functions

A function definition starts with the reserved word `func`, then the name you've chosen for the funciton. The body (the statements to execute when the function is called) are written indented on the next lines. For example:

```
# a function named 'david' with a body of two statements
func david 
    (print (add 3 5))    # display result of adding 3 to 5
    (print "hi")         # display "hi"
```

To use the function---to *call*, to *invoke* the function---we use parens around the function name, as if it were an operator:

```
(david)          # call david
```

A function call returns a value. A `return` statement ends a function call and specifies the value to return:

```
func karen 
    (print "hi") 
    return 9

as foo (karen)            # assign 9 to 'foo'
```

A function with no `return` statement at the end implicitly ends with a `return` statement returning the special value ***null***, which is used as a placeholder indicating the absense of any other value:

```
func jack
    (print "hi")

func erin
    (print "hi")
    return null         

as foo (jack)            # assign null to 'foo'
as bar (erin)            # assign null to 'foo'
```

A function may receive input values, called ***arguments***. For each argument, the function must have a ***parameter variable*** in which to store the argument. Parameters are denoted by names listed after the function name:

```
# a function named chris with three parameters: orange, banana, and apple
func chris orange banana apple
    (print apple orange banana)

func jane a b
    return (mul a (add 3 b))

(chris 1 2 3)         # prints 3 1 2
(print (jane 2 7))    # prints 20
```

Note that the arguments to a function call are assigned to the corresponding parameter variables in the same position: the first argument is assigned to the first parameter, the second argument is assigned to the second parameter, *etc.*

Lastly, understand that a function definition is not a kind of statement. Function definitions can only be written at the top level of code, never in the bodies of other functions or `if` or `while` statements.

## local and global variables

Any variables created in a function, including the parameter variables, are said to be 'local' to the function. Each call to a function creates its own set of the local variables, and each set disappears when its call ends. So, say, local variable 'foo' in one call is separate from local variable 'foo' in another call.

Local variables of one function do not exist outside that function. There is no conflict if two local variables in separate functions have the same name: they are wholly separate variables that just happen to have the same name.

A variable created outside any function is ***global***, meaning it exists for the whole duration of the program and is accessible anywhere in code. 

Pigeon has simple rules for name conflicts:

 - no variable can have the same name as any function
 - a global variable cannot have the same name as any local variable (and *vice versa*)

(Real programming languages have more complicated naming rules that allow for more flexibility, but we're going for simplicity in Pigeon.)

## lists

A list is a value which itself is made up of any number of other values. The values in a list are known by their numeric indexes. The first element has index 0, the second has index 1, the third has index 2, the fourth has index 3, *etc.*

The `list` operator returns a new list made up of the operands:

```
(list)              # return a list with no values
(list 6 "hi" 78)    # return a list with three values: 6, "hi", 78
```

The `get` operator retrieves the value of a list at a given index:

```
as foo (list 6 "hi" 78)
(get foo 2)         # return 78 (the value at index 2 of the list stored in variable 'foo')
```

The `set` operator modifies the value of a list at a given index:

```
as foo (list 6 "hi" 78)
(get foo 0)              # 6
(set foo 0 "bye")    
(get foo 0)              # "bye"
```

The `len` (length) operator returns the number of values within a list:

```
as bar (list)              
as foo (list 6 "hi" 78)    
(len bar)                  # 0
(len foo)                  # 3
```

The `append` operator adds a value to the end of a list, increasing the list's length by one:

```
as foo (list 6 "hi" 78)
(append foo 900)
(get foo 3)        # 900
(len foo)          # 4
```

## references vs. values

You may have wondered how a single variable can store any kind of value. Strings, numbers, booleans, and lists all take up different amounts of memory, so how can one location in memory store any kind of thing? Well, a variable in Pigeon does not actually store a value directly. Instead, a variable stores a memory address, a ***reference*** to where an actual value is located elsewhere in memory. 

Likewise, a list stores references rather than directly store actual values.

When multiple references refer to the same unmodifiable value, there's nothing to worry about. When multiple references refer to a modifiable value, however, it's important to be aware that changes *via* one reference will show up when we read the value *via* another reference.

Nearly all operations in Pigeon leave their input values unmodified. The `add` operator, for example, produces a new, separate output value, leaving its input values unmolested. The only two exceptions are `set` and `append`, which modify their list input. A list is the only kind of value in Pigeon that can be modified:

```
as foo (list 6 "hi" 78)
as bar foo                # 'bar' will now reference the same list as 'foo'
(set bar 1 "yo")          # modify index 1 of the list referenced by 'bar'
(get foo 1)               # "yo"
```

Again, a list actually stores references, not values directly, so it's possible for multiple list indexes to reference the same value:

```
as foo (list 6 "hi" 78)
as bar (list)
(append bar foo)
(append bar "yo")
(append bar foo)
(get bar 0)         # returns the same list referenced by 'foo'          
(get bar 1)         # returns "yo"
(get bar 2)         # returns the same list referenced by 'foo'          
```

It's even possible for a list index to reference the same list that contains it, *i.e.* a list can contain itself!

```
as foo (list 6 "hi" 78)
(append foo foo)
(get foo 3)         # returns the same list referenced by 'foo'
``
