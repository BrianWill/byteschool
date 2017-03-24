
## 'if' and 'while' statements

An 'if' statement in Pigeon begins with the word `if` followed by a condition and a body.

The condition is an expression (a value, variable, or operation) which must return a boolean value. The body is one or more indented statements.

```
as x 2
# because 'x' is not greater than 5, the condition is false, and so the two indented print statements are skipped over
if (gt x 5)
    (print "hi")
    (print "bye")
(print "yo")     # this statement is not part of the 'if' body
```

(The lines in the body must be indented by the same number of spaces and tabs. It's generally best to indent by a single tab or by 4 spaces.)

Because an `if` is itself a kind of statement, an `if` can be nested inside the body of another `if`:

```
# this outer 'if' has a body of three statements: a print, an if, and another print
if (gt x 5)
    (print "hi")
    # this inner 'if' has a body of one statement: a print
    if (lt x 10)
        # execution only reaches here if x is greater than 5 and less than 10
        (print "ahoy")
    (print "bye"0)
```

A `while` statement is written just like `if` but starts with the word `while`:

```
# this code prints: 0 1 2 3 4 done
as x 0
while (lt x 5)
    (print x)
    as x (add x 1)   # increase the value of 'x' by 1
(print "done")
```

Again, `if` and `while` are kinds of statements and their bodies are composed of statements: an `if` body can contain other `if`'s and `while`'s; a `while` body can contain other `while`'s and `if`'s.

## `else` and `elseif` clauses

Very often we want to branch between two mutually exclusive cases, meaning we want to do one thing or the other but never both. We can arrange this with two successive `if` statements with logically inverse conditions:

```
if (gt x 3)
    (print "hi")
if (not (gt x 3))
    (print "bye")
```

Above, if *x* is greater than 3, we'll print "hi", otherwise we'll print "bye". Always one of the bodies gets executed, but never both.

Alternatively, we can immediately follow an `if` statement with an accompanying `else` clause, which has its own body and executes only when the condition tested false. This code is functionally equivalent to the above:

```
if (gt x 3)
    (print "hi")
else            
    (print "bye")
```

Sometimes we wish to branch between *more than two* mutually exclusive cases. We can arrange this by nesting `if`s inside a waterfall of `else` clauses:

```
if (eq x 3) 
    (print "cat")
else
    if (eq x 5)
        (print "dog")
    else
        if (eq x 9)
            (print "bird")
```

Above, only of the *print* operations executes, depending on the value of *x*. (The value of *x* might not equal 3, 5, or 9, in which case none of *print* operations execute.)

To express the above less verbosely, we can use `elseif` clauses:

```
if (eq x 3) 
    (print "cat")
elseif (eq x 5)
    (print "dog")
elseif (eq x 9)
    (print "bird")
```

The conditions are tested in order: when a condition tests true, its body executes, and all the others are skipped over. *Only one body ever runs.* 

We can put an `else` clause at the end, whose body will execute when none of the conditions test true:

```
if (eq x 3) 
    (print "cat")
elseif (eq x 5)
    (print "dog")
elseif (eq x 9)
    (print "bird")
else 
    (print "moose")
```
