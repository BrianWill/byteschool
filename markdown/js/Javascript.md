# the Javascript language

(Our coverage of Javascript assumes familiarity with Pigeon but no other programming language.)

## running Javascript code

A web browser includes a *Javascript engine*, a component for compiling and runnning Javascript code. When you visit a web page, Javascript code included with the page is compiled and run by the browser. The code can manipulate the page, respond to user interactions, and retrieve more data from servers, but it cannot access files on the local system or perform other security-sensitive tasks.

*Node.js* (usually just called 'Node') is a Javascript engine for running standalone programs outside any web browser. Unlike web browsers, Node lets Javascript code access files and all the other things which normal programs can do. Node is most commonly used for creating servers (programs which listen and respond to requests from other computers over the network).

Javascript has no explicit compilation step. A Javascript engine takes source files as input and immediately runs the code in those files. The top-level of code is a series of statements that execute in order, starting with the first source file and then moving on to the next. An exception (an error) is triggered when executing a statement that uses a variable or function that doesn't yet exist.

## data types

Javascript has six data types:

 - numbers (64-bit floating point)
 - strings
 - booleans
 - functions
 - arrays (lists of values)
 - objects (maps of strings to values)

Additionally, Javascript has two special values:

 - null (a special value denoting 'nothing is here')
 - undefined (a special value denoting 'nothing was ever here')

## variables and assignment

In Javascript, we declare a variable with a `var` statement, and we assign a value to a variable with the `=` operator. Most kinds of statements in Javascript, including `var` and assignment statements, must end with a semicolon:

```javascript
// comments in Javascript begin with two slashes
var x;               // declare a variable 'x'          
x = 3;               // assign value 3 to 'x'
var y = "hi";        // declare a variable 'y' and assign it "hi"
y = 9;               // assign 9 to 'y'
```

A variable declared outside any function is global. A variable declared inside a function is local to that function. 

If a function has a local variable 'foo', we cannot refer to a global variable 'foo' by name in that function. (If we want to use both things inside the function, we can simply change the names to be different.)

It doesn't matter where in a function we declare the variables. We can even put the `var` statements at the very end of the function. (Don't think of variable declarations in functions as actions to execute: rather, when a function is created, the declarations just tell the compiler what variables exist in its scope.)

## operators

Javascript (and most popular languages) uses [infix notation](https://en.wikipedia.org/wiki/Infix_notation). Most operators are binary operators (they take two inputs) with the operator written in between the operands, *e.g.*:

 - `+` addition
 - `-` subtraction
 - `*` multiplication
 - `/` division
 - `%` modulus
 - `=` assignment
 - `>` greater than
 - `<` less than
 - `>=` greater than or equal to
 - `<=` less than or equal to
 - `===` equality
 - `!==` not equals
 - `&&` and
 - `||` or

(We'll introduce the rest later.)

The operators have an order of precedence, which allows us to often leave the parentheses around some operations implicit:

```javascript
3 + 5 * 9             // * has higher precedence than +, so this is implicitly (3 + (5 * 9))
```

Parens are only necessary to subvert the normal order of precedence:

```javascript
(3 + 5) * 9           // do the addition first
```



















