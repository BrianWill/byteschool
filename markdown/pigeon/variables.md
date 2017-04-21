# Pigeon variables

A variable is created with a `var` statement:

```
var foo        # create a variable 'foo'
```

A variable starts out with the value `null`. 

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

## expressions

An ***expression*** is anything which *evaluates* into a value:

 - a literal evaluates into the value it represents
 - a variable evaluates into the value it references at that moment in time
 - an operation evaluates into the value which it returns

For example, these are all expressions:

```
3                     # evaluates into the number 3
"yo"                  # evaluates into the string "yo"
foo                   # evaluates into whatever variable 'foo' references at this moment
(add 4 2)             # evaluates into the number 6
(mul 2 (sub 9 1))     # evaluates into the number 16
```

(Note that operations are expressions built out of other expressions.)

## reserved words

A ***reserved word*** is any word given special significance in the language. Most of the reserved words in Pigeon are the operators (`add`, `sub`, `mul`, *etc.*), and three others are the values `true`, `false`, and `null`. The several remaining reserved words each have their own particular meaning and syntax, *e.g.* `if`, `while`, `return`.

You cannot create variables with reserved word names:

```
as sub 3      # error
```