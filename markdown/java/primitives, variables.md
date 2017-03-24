# primitive types and variable declarations

## primitive types

Java has eight primitive types:

```
Java                    Go equivalent
----                    ----
byte                    int8
short                   int16
int                     int32
long                    int64

char                    uint16

boolean                 bool

float                   float32
double                  float64
```

The lack of unsigned integers---especially unsigned bytes---may seem perplexing. Understand, though, that the CPU doesn't really see any difference between signed and unsigned integers! Bits are just bits, and the arithmetic operations work the same regardless. As we'll see later, we can read Java's signed integers as if they're unsigned. As far as the compiler is concerned, however, all the integer types---excluding `char` (short for 'character')---are signed.

Whereas number literals in Go are 'constant' (*i.e.* have no specific type), integer literals in Java are `int`'s, and floating-point literals are `double`'s. A character literal is written in single-quote strings, *e.g.* `'F'` is the `char` value 70 (the Unicode codepoint for capital 'F').

## variables

Java has no `var` reserved word or `:=` syntax, and types are never inferred. To declare a variables in Java, we write the type first before the name:

```java
int foo;        // declare an int variable 'foo'
foo = 5;        // assign 5 to 'foo'

int bar = 7;    // declare and initialize int variable 'bar'
```

(Note that semi-colons in Java must always be written explicitly.)

An uninitialized variable has no value. Using a variable that might be uninitialized triggers a compile error:

```java
int foo;
if (bar < 9) {
    foo = 4;
}
bar = foo;          // compile error: 'foo' not necessarily initialized by this point (depends on value of 'bar')
```

## casting primitives

A casting operation is denoted in Java by the type enclosed in parens before the value to cast:

```java
long foo = (long) 35;         // cast int value 35 to long to assign it to a long variable
```

Casts between primitives can be left implicit except when the cast might distort the value:

```java
long foo = 35;                // ok: implicit cast to long (all int values are valid long values, so distortion is impossible)
int bar = 72.8;               // compile error: casting a double to an int may distort the value, so cannot leave cast implicit
```
