# Pigeon functions

A Pigeon program is primarily composed of functions. As discussed, a function is a chunk of statements that is given a name such that we can execute the chunk anywhere else in code by just writing the name.

A function definition in Pigeon starts with the reserved word `func`, then the name you've chosen for the funciton. The body (the statements to execute when the function is called) are written indented on the next lines. For example:

```
// a function named 'david' with a body of two statements
func david 
    (print (add 3 5))    // display result of adding 3 to 5
    (print "hi")         // display "hi"
```

To execute a function---*a.k.a.* 'call' *a.k.a.* 'invoke' a function---we use parens around the function name, as if it were an operator:

```
func heidi
    (david)              // call david
    (print "yo")
```

## the main function

Execution of a Pigeon program begins by calling the function named `main`:

```

func jill
    (print "hi")

func main 
    // execution begins here
    (jill)
    (ted)

func ted
    (print "bye")
```

## `return` statements

A function call returns a value. A `return` statement ends the function call and specifies the value to return:

```
func karen
    (print "hi") 
    return 9

func main
    (print (karen))            // print "hi", then 9
```

A function with no `return` statement at the end implicitly ends with a `return` statement returning the special value `nil` (which represents 'nothing').

```
func jack
    (print "hi")

func erin
    (print "yo")
    return null         

func main
    (print (jack))            // print "hi", then nil
    (print (erin))            // print "yo", then nil
```

## parameters and arguments

A function may have ***parameter variables***. Parameters are denoted as names listed after the function name. When called, an ***argument*** (a value) must be provided for each parameter:

```
// function chris has two parameters: orange and banana
func chris orange banana
    (print banana orange)

func main
    // in this call to chris, orange will have the value 1, and banana will have the value 2
    (chris 1 2)         // print 2 1
```

Note that the arguments to a function call are assigned to the corresponding parameter variables in the same position: the first argument is assigned to the first parameter, the second argument is assigned to the second parameter, *etc.*

```
// function jane has two parameters: a and b
func jane a b
    return (mul a (add 2 b))

func main
    (print (jane 2 7))    // print 18
    (print (jane 4 6))    // print 32
```

## variables

A variable is a symbolic name representing a location in memory that stores a value.

In each function call, a parameter gets its initial value from the corresponding argument to the call, but we can change a variable's value with an assignment statement. An assignment statement starts with the word `as` followed by a variable name and a value to assign to the variable:

```
func ian x y
    as x 8                // assign the value 8 to x
    return (add x y)

func main
    (print (ian 4 7))     // print 15
```

## `locals` statements

In addition to its parameters, a function can have other variables that start with the initial value `nil`. These variables are created with a `locals` statement (which must be the first statement of the function):

```
func john a b
    locals c d             // create variables c and d, both with the initial value nil
    (print c)              // print nil
    as c (add a b)         // assign result of adding a and b to c
    as d (mul c 5)         // assign result of multiplying c and 5 to d
    return d               // return the value of d

func main
    (print (john 2 4))     // print 30
```

The variables of a function do not exist in other functions:

```
func lisa x
    return (add x y)        // illegal! no variable y exists in lisa

func main
    locals y
    as y 8
    (lisa)
```

If two functions have a variable of the same name, they are wholly separate variables that just happen to have the same name:

```
func lisa x              // this x belongs to lisa
    return (add x 7)

func main
    locals x                 // this totally separate x belongs to main
    as x 3
    (print (lisa x))
```

Each call to a function creates its own set of the local variables, and each set disappears when its call ends. So, say, local variable 'x' in one call is separate from local variable 'x' in another call to that same function.

(Variables in Pigeon do not actually store values *directly*. Instead, assignment stores the *address* of the value. This distinction will be significant when we deal with lists and maps later.)

## global variables

A variable created outside any function is ***global*** (rather than ***local***), meaning it exists for the whole duration of the program and is accessible anywhere in code.

We can create a global variable with a `global` statement:

```
global x 6                   // create global x with initial value 6

func lisa x              // this x belongs to lisa
    return (add x 7)

func main
    (print x)                // print 6
    as x 10                  // assign 10 to global x
    (print (lisa x))         // print 17
```

Note that, because function 'lisa' has its own 'x', it cannot use the global 'x'. If we need to use global 'x' in 'lisa', we must rename either variable to avoid the name conflict.

## expressions

An ***expression*** is anything which *evaluates* into a value:

 - a literal evaluates into the value it represents
 - a variable evaluates into the value it references at that moment in time
 - an operation evaluates into the value which it returns
 - a function call evaluates into the value which it returns

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