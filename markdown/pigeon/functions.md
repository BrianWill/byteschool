# Pigeon functions

A function definition starts with the reserved word `function`, then the name you've chosen for the funciton. The body (the statements to execute when the function is called) are written indented on the next lines. For example:

```
# a function named 'david' with a body of two statements
function david 
    (print (add 3 5))    # display result of adding 3 to 5
    (print "hi")         # display "hi"
```

To use the function---to *call*, to *invoke* the function---we use parens around the function name, as if it were an operator:

```
(david)          # call david
```

A function call returns a value. A `return` statement ends a function call and specifies the value to return:

```
function karen
    (print "hi") 
    return 9

as foo (karen)            # assign 9 to 'foo'
```

A function with no `return` statement at the end implicitly ends with a `return` statement returning the special value ***null***, which is used as a placeholder indicating the absense of any other value:

```
function jack
    (print "hi")

function erin
    (print "hi")
    return null         

as foo (jack)            # assign null to 'foo'
as bar (erin)            # assign null to 'foo'
```

A function may receive input values, called ***arguments***. For each argument, the function must have a ***parameter variable*** in which to store the argument. Parameters are denoted by names listed after the function name:

```
# a function named chris with three parameters: orange, banana, and apple
function chris orange banana apple
    (print apple orange banana)

function jane a b
    return (mul a (add 3 b))

(chris 1 2 3)         # prints 3 1 2
(print (jane 2 7))    # prints 20
```

Note that the arguments to a function call are assigned to the corresponding parameter variables in the same position: the first argument is assigned to the first parameter, the second argument is assigned to the second parameter, *etc.*

Lastly, understand that a function definition is not a kind of statement. Function definitions can only be written at the top level of code, never in the bodies of other functions or `if` or `while` statements.

## local vs. global variables

The `var` statements in a function must precede all other statements.

A `var` statement in a function creates a variable ***local*** to the function. Each call to a function creates its own set of the local variables, and each set disappears when its call ends. So, say, local variable 'foo' in one call is separate from local variable 'foo' in another call.

Local variables of one function do not exist outside that function. There is no conflict if two local variables in separate functions have the same name: they are wholly separate variables that just happen to have the same name.

The parameters of a function are local variables of the function. (The only thing special about parameters is that they get assigned the arguments at the start of the call.)

A variable created outside any function is ***global***, meaning it exists for the whole duration of the program and is accessible anywhere in code.

In truth, the names of functions are global variables! A `function` creates the variable (if it doesn't already exist) and assigns the new function to the variable:

```
# this function statement assigns a new function to the global variable 'foo'
function foo
    return "hi"
```

If a function has a local variable 'foo', you cannot use any global variable 'foo' in that function. (If you need to use both in the function, simply rename one or both variables.)
