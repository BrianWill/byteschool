# Go syntax

## comments

Comments in Go are written starting with `//` rather than `#`.

We can also write *multi-line comments* starting with `/*` and ending with `*/`. Everything in between is ignored. Unlike `//` comments, multi-line comments can span across multiple lines.

```go
/* all of this 
    is a 
  single comment */
```

## semi-colons

Most kinds of statement in Go must end with a semi-colon:

```
foo();
z := 3;
if z > 5 {
    bar();
}
```

However, before it reads your code, the Go compiler will insert semi-colons at the end of any line ending with...

 - an identifier (a name defined in code, such as a variable or function name)
 - a constant (*e.g.* 35.7, "hi", true, false)
 - `break`
 - `continue` 
 - `fallthrough`
 - `return`
 - `++` 
 - `--`
 - `)`
 - `}`

So if we removed all the semi-colons in the above code, Go would insert a semi-colon in all those spots anyway.

(The compiler does not actually modify your source files: it just modifies the text in memory before it compiles the code.)

## infix notation

Unlike Pigeon, which uses prefix notation, Go uses *infix* notation (the style of notation you're familiar with from mathematics). Most operators are binary, meaning they have two operands: one on the left and one on the right. A few are unary, meaning they have just one operand, usually to the right of the operator. These are the most commonly used operators:

```
 +    (addition)
 -    (subtraction)
 *    (multiplication)
 /    (division)
 %    (modulus)
 ==   (equality)
 !=   (not equals)
 <    (less than)
 >    (greater than)
 <=   (less than or equal to)
 >=   (greater than or equal to)
 !    (not)
 &&   (and)
 or   (or)
```

In infix notation, operators have an order of precedence. Where parentheses do not make the order of operations explicit, operators with 'higher precedence' are performed first:

```
3 + 5 * 9    // implicitly (3 + (5 * 9)) because * has a higher precedence than +
```

Infix notation function calls are written with the function to call preceding parens, with the arguments separated by commas inside the parens:

```
// call 'foo' with arguments 'a', 'b', and 'c'
foo(a, b, c)
```

## statement bodies

In Go code, we write:

 - `for` instead of `while`
 - `else if` (two separate words) instead of `elseif`

The bodies of `if`'s, `for`'s, and `func`'s are surrounded in curly braces. The Go compiler does not care how you indent your code, but it is preferred practice to follow the same indentation style as in Pigeon:

```
// if x is less than 3, call function 'foo', passing 7 and false as arguments
if x < 3 {
    foo(7, false)    
}
```



