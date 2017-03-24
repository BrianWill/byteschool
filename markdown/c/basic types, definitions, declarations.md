# C basic types, definitions, and declarations

## basic types 

https://en.wikipedia.org/wiki/C_data_types


## declarations and definitions

***Definitions*** create functions and variables.

***Declarations*** specify the types of functions, variables, or data types.

(Note that data types are only declared, never defined.) [actually, is struct considered a definition? will redundant struct definitions conflict?]

All definitions are also declarations, but not all declarations are definitions.

You can define something only once, but you can declare it any number of times (though the compiler will complain if any two declarations contradict each other).

When the compiler reads a source file, it expects every name to be declared before it is used. For example, before a call to *foo*, the function *foo* must be declared (or defined!) somewhere above it in the code of that source file.

## variable declarations and definitions

A variable definition is written with the type followed by the name followed by assignment of an initial value. C never infers types:

```c
int foo = 0;         // define a variable named 'foo' with initial value 0
```

(Semi-colons are never implicit in C. You must put a semi-colon at the end of every statement, except statements with `{}` bodies.)

If we leave a local variable uninitialized (do not assign it an initial value), it is still a definition. To maximize efficiency, when C stakes out a memory location for an uninitialized local variable, it does not overwrite the bits with zeroes or anything. Effectively, we cannot predict what value an uninitialized variable will hold: the value is determined by whatever state the bits at that location happened to have been in:

```c
// assume we're in a local scope
int foo;              // uninitialized variable definition
int bar = foo;        // no error, but we cannot say what value will be assigned to 'bar'
```

If we leave a global variable uninitialized, it's a "tentative definition", meaning it's only a definition if the code contains no initialized definition of the same global variable:

```c
// assume we're in global scope (outside of any function)
int x;                // tentative definition
int x;                // tentative definition
```

Above, assuming global int variable *x* is not initalized anywhere in the code, one of the two tentative definitions will count as a definition, and the other will merely be a declaration.

If the code *does* contain an initialized definition of the same global variable, a "tentative definition" is merely a declaration:

```c
// assume we're in global scope (outside of any function)
int x;                // declaration
int x;                // declaration
int x = 9;            // definition
```

(The tentative definition rule is weird, but it makes some sense given how C code is compiled and linked, as we'll discuss later.)

To declare a variable without defining it, use the reserved word `extern`:

```c
extern int x;       // declaration
```

However, if you initialize, it becomes a definition even if you use `extern`:

```c
extern int x = 32;  // definition
```

(There's no real reason to use `extern` if you initialize.)

## function definitions and declarations

Functions are defined only at the top level of code (meaning functions cannot be nested). A function definition is written with its (one and only) return type first, followed by the name, and then the list of parameters. There is no reserved word `func`:

```c
// function 'foo' takes a char parameter 'a' and an int parameter 'b' and returns an int
int foo(char a, int b) {
    // ...
}
```

Some programmers prefer to write the return type on the preceding line for visual clarity (we will follow this convention):

```c
int
foo(char a, int b) {
    // ...
}
```

(Because C does not insert implicit semi-colons, it allows you total freedom in how you format your code. Different programmers follow different styles. Whatever the style you choose, please be consistent!)

A function which returns nothing is said to return the special type ***void***:

```c
// function 'foo' takes an int parameter 'a' and returns nothing
void
foo(int a) {
    // ...
}
```

To declare a function without defining it, we put a semi-colon where the definition body normally goes (and optionally we can omit the parameter names):

```c
// declare a function 'foo' taking a char and a float and returning an int
int
foo(char, float);
```

If we declare a function inside a local scope, the declaration is local to that scope. Usually, though, we just put all function declarations at the top-level of code.

## casting

A cast is written with the destination type in parentheses before the value to cast:

```c
int x = 3;
float y = (float) x;      // cast value of 'x' to a float
```

Many casts can be left implicit. Casting int to float, for example:

```c
int x = 3;
float y = x;              // implicit cast to float
```

The general rule is that casts which may distort the value must be explicit:

```c
int x = 3;
float y = x;
x = (int) y;              // cast from float to int must be explicit (because not all float values have an exact int equivalent)
```

Many binary operators accept operands of different number types, such that one operand is implicitly cast to the type of the other:

```c
int x = 3;
float y = 7.2;
float z = x + y;          // 'x' implicitly cast to float, and the + operation returns float
```

The precise rules of which operator type 'takes precedence' are fairly complicated. Better to use explicit casts than to rely on these complicated rules!

## typedef

In Go, `type` creates a new type. C's `typedef` merely creates an *alias* for an existing type. Unlike Go's `type`, C's `typedef` puts the new type name *after* the existing type:

```c
// create alias 'erin' for existing type int
typedef int erin;

int x;
erin y;
x = y;          // ok
y = x;          // ok
```

Above, int and *erin* are considered just different names for the same type.

## number literals

An integer literal in C is considered always to be an int. Assigning an integer literal to non-int types requires a cast, but often this cast can be left implicit:

```c
long n = (long) 7;         // the cast can be left implicit
```

Similarly, a floating-point literal is always a double, but we can assign floating-point literals to double variables because the cast is implicit:

```c
float f = (float) 8.2;     // the cast can be left implicit
```
