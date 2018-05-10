# Pigeon variables



A variable is either `global` (accessible in all parts of code) or `local` (accessible only within a single function).

Global variables are created with a global statement

Each function has its own set of variables, called its local variables.

Variables in Pigeon do not store values directly. Instead, assignment stores the *address* of the value. (This distinction is significant when we deal with lists in a later lesson.)

An assignment statement starts with the word `as` followed by a variable name and a value to assign to the variable:

```
as foo 3       # assign 3 to the variable 'foo'
```

Once we create a variable, we can use its value in subsequent operations and assignments:

```
var foo
var bar
as foo 3       
(print foo)    # display 3
as foo 7       # assign a new value, 7, to 'foo'
(print foo)    # display 7
as bar foo     # assign 7 to variable 'bar'
as foo 29      # assign 29 to variable 'foo'
(print bar)    # display 7
```

The value assigned can be produced by an operation:

```
as foo (sub 10 2)    # assign 8 to the variable 'foo'
as foo (add foo 4)   # assign 12 to the variable 'foo'
(print foo)          # display 12
```

