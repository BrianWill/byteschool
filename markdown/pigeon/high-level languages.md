# high-level languages

Assembly languages offer a very ***low-level of abstraction***, meaning they give the programmer precise control over what the machine does but at the cost of burdening the programmer with all of the details. Non-assembly languages offer a ***higher-level of abstraction***, meaning that they handle details for the programmer at the cost of taking away some control.

Whereas an assembler performs a simplistic, virtually one-to-one translation of each line of code, a ***compiler*** for a high-level language generally does a more elaborate form of translation such that each line of source code may correspond to many instructions in the output. A skilled programmer can predict exactly what an assembler will output for a given input, but it's much harder to do the same with a compiler for a high-level language. Compilers simply guarantee that the code they generate will perform the actions prescribed by the input source code according to the rules of the language.

An ***interpreter*** is a program that, as it reads code, *immediately does what the code says to do* rather than output another form of code. In principle, any high-level language code can be either interpreted or compiled, but for various reasons, compilation is more appropriate for some languages while interpretation is more appropriate for others.

Because an interpreter is itself a running program that takes up memory and time to execute, running code *via* an interpreter is generally less efficient than running code that has been compiled.

For some languages, the source code is first compiled into some form of code other than machine code, and then the program is run by interpreting this non-machine code. This hybrid approach is meant to split the difference, gaining some advantages of compilation and some advantages of interpretation.

## common elements of high-level languages

All commonly used high-level languages have these features (though they may go by different names in some languages):

 - data types
 - operators
 - declaration statements
 - assignment statements
 - `if` statements
 - `while` statements
 - functions

In any code, we deal with data, and data comes in different types. Every language has a set of built-in ***data types***, such as types for representing numbers and strings (pieces of text data). Most languages also allow the programmer to define new data types that are composites of existing types. For example, a programmer might wish to define a data type for representing a person, and so the programmer creates a composite of, say, a string for the person's name, a number for their weight, and another string for their street address. (Depending upon your program's needs, you might need to store different kinds of information about a person, so you might compose your person data type out of other elements.)

With our data, we want to perform *operations*, such as adding and subtracting numbers, so every language has a few dozen ***operators*** for use with the language's built-in data types. An operation takes in one or more input values and produces a single output value. For example, an addition operation takes two numbers as input and produces the number which is the sum of the two inputs. Every language contains the arithmetic operators familiar from math, but most languages also include some operators not familiar from math.

To retain values in our code, we need to store them in memory. A ***variable*** is a symbolic name that represents a location in memory that stores a single value. Be clear that what we call variables in mathematics are not exactly the same thing: in a mathematical equation, like `y = 2x`, the variables in a sense represent all possible values at once; in code, we can overwrite the value stored by a variable with a new value, but at any one moment, a variable stores just one value.

Code in most languages is written as a series of ***statements***, and these statements are executed one after the other, first-to-last.

A *declaration* statement creates a variable. An *assignment* statement stores a value in a variable.

An `if` statement has a condition and contains other statements. The condition is something like 'is variable x greater than the number 5?' or 'is variable y equal to the number 8?'. The contained statements can be any kind, even other `if` statements. When an `if` is executed, its condition is tested, and if true, the contained statements are executed in order; if the condition tests false, the contained statements are skipped over. Either way, execution continues on to the next statement after the `if`.

A `while` statement is just like an `if`, but with one difference: after the condition tests true and the contained statements are executed, the condition is tested again. If the condition is true again, the contained statements are executed another time, and the condition tested once more. This repeats indefinitely until the condition tests false, in which case execution continues on to the next statement after the `while`.

A ***function*** is a series of statements that we give a name, such that we can run that series of statements in other parts of code by just referring to the name. A function can also receive input values and produce an output value. A function, in a sense, is like an operator created by the programmer.

## I/O in higher-level languages

As discussed earlier, talking to the I/O devices requires executing certain instructions, but nothing described above allows us to execute these instructions! So how do we do I/O in a high-level language? Well, by some means the high-level code we write needs to invoke assembly code which will perform I/O:

 - In the C language, we can 'link' our C code to assembly code such that we can invoke the assembly from C. 
 - In some other languages, we can link our code to C code such that we can invoke the C code and thus indirectly invoke assembly. 
 - Some other languages provide a built-in set of special functions. Though called like ordinary functions, these functions do I/O stuff which you couldn't otherwise do in an ordinary function of the language.

## Pigeon (an educational language)

The Pigeon language is a reductively simple programming language I've created for educational purposes. Everything you learn about Pigeon in the next few lessons carries over into real languages, like Python or Javascript.