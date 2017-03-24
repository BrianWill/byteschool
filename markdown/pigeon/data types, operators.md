
# Pigeon (an educational language)

The Pigeon language is a reductively simple programming language I've created for educational purposes. Everything you learn in Pigeon carries over into real languages, like Python or Javascript.

## comments

It's sometimes useful to leave notes in code, and so we need some way of telling the compiler or interpreter to ignore a chunk of text. These are called ***comments***. In Pigeon, a comment starts with # and includes all text through the rest of that line:

```
# This number sign and everything after it on the line is ignored by the language
```

## data types

Numbers are written as you would expect:

```
3      # integer
-7.3   # floating-point
```

A boolean is a data type with just two values:

```
true
false
```

Much like a bit, what a boolean represents depends entirely upon context.

Strings (pieces of text) are written enclosed in double-quote marks:

```
"hi there"    # string with the characters: h i space t h e r e
```

Because double-quote marks are used to denote the end of the string, you must write `\"` to include a double-quote mark in the string:

```
"foo\"bar"     # string with the characters: f o o " b a r
```

A string can not span multiple lines. To include a newline in a string, you must write `\n`. The actual ASCII/Unicode character(s) this denotes depends upon the platform: on Windows, it denotes CR and LF (carriage return, line feed); on Linux and Mac, it denotes just LF (line feed).

```
"foo\nbar"     # string with the characters: f o o newline b a r
```

Because backslash is used to denote certain special characters, you must write `\\` to include a backslash in the string:

```
"foo\\bar"     # string with the characters: f o o \ b a r
```

## arithmetic operators

Every operation in Pigeon is written as a pair of parentheses containing the name of the operator followed by the operands (the inputs). The arithmetic operators are `add` (addition), `sub` (subtraction), `mul` (multiplication), and `div` (division):

```
(add 3 5)      #  add 3 to 5, producing 8
(sub 3 5)      #  subtract 5 from 3, producing -2
(mul 3 5)      #  multiply 3 and 5, producing 15
(div 3 5)      #  divide 3 by 5, producing 0.6
```

Pigeon is a high-level language that spares us from having to think about the bit-representation of numbers. The math operators always return the mathmatically correct answer, and you don't have to worry about overflow or underflow. (This convenience does come at significant efficiency costs, but for many tasks, the costs won't really matter.)

The arithmetic operators expect only numbers as inputs. The wrong type of input will trigger an error that aborts the program:

```
(sub 3 "hi")    # error: cannot subtract a string
```

An operation can itself be used as an operand, in which case the value it produces is used as input to the containing operation:

```
(mul 2 (add 3 5))    # multiply 2 with the result of (add 3 5), producing 16
```

The `mod` (modulus) operator returns the remainder of division:

```
(mod 11 3)     # produces 2  (11 divided by 3 has remainder 2)
(mod 12 3)     # produces 0  (12 divided by 3 has no remainder)
```

### equality and logic operators

The `eq` (equality) operator produces the boolean value if its operands are equal; otherwise, it produces false:

```
(eq 2 2 2)        # all operands are equal, produces true
(eq 3 8 3)        # not all operands are equal, produces false
(eq "hi" "hi")    # produces true
(eq "hi" "bye")   # produces false
```

The `not` operator takes a single boolean operand and returns the opposite:

```
(not false)       # produces true
(not true)        # produces false
```

The `neq` (not equal) operator is a convenient way to combine `not` and `eq` in one operation:

```
(not (eq 2 2 2))   # produces false
(neq 2 2 2)        # produces false
``` 

The `and` operator returns true only if every operand is true:

```
(and true true true)     # true
(and true false true)    # false
(and false false false)  # false
```

The `or` operator returns true if any operand is true:

```
(or true true true)     # true
(or true false true)    # true
(or false false false)  # false (no operands are true)
```

# relational operators

The `gt` (greater than) operator returns true only if every operand is greater than the operand to its right:

```
(gt 8 5 2)         # true
(gt 8 5 6)         # false
(gt 8 8 2)         # false (8 is not greater than 8)
```

The `gte` (greater than or equal) operator returns true only if every operand is greater than or equal to the operand to its right:

```
(gt 8 5 2)         # true
(gt 8 5 6)         # false
(gt 8 8 2)         # true
```

The `lt` (less than) operator returns true only if every operand is less than the operand to its right:

```
(lt 2 5 8)         # true
(lt 7 5 8)         # false
(lt 7 7 8)         # false (7 is not less than 7)
```

The `lte` (less than or equal) operator returns true only if every operand is less than or equal to the operand to its right:

```
(lte 2 5 8)         # true
(lte 7 5 8)         # false
(lte 7 7 8)         # true
```

## concat

The `concat` (concatenate) operator produces a string that is the concatenation of the operands:

```
(concat "FOO" "BAR")                         # produces "FOOBAR"
(concat "rubber " "baby" " buggy bumper")    # produces "rubber baby buggy bumper"
```

## input/output

As dicsussed earlier, performing input and output ultimately requires system calls. Because Pigeon is a simple, educational language, it has no facility for performing system calls, but it does provide two operators for doing very basic input/output.

The `print` operator displays text on screen:

```
(print "hello")    # display "hello" on screen
(print 35)         # display "35" on screen
```

The `prompt` operator takes no operands. It prompts the user on screen to type something and hit enter. The text entered by the user is returned as a string:

```
(print (prompt))       # wait for the user to type something and hit enter; display what they typed
```

(Note that, unlike every other operation, `prompt` waits for user action before execution continues.)

## variables and assignment

An assignment statment is written with the word `as` followed by a variable name and a value to assign to the variable:

```
as foo 3       # assign 3 to the variable 'foo'
```

If the variable does not already exist, the assignment creates the variable. Otherwise, the assignment gives the existing variable a new value.

Once we create a variable, we can use its value in subsequent operations and assignments:

```
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
foo                   # evaluates into whatever 'foo' references at this moment
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