# Java primitive types and operators

## primitive types

Java has eight built-in ***primitive types***:

 - `boolean` (true or false)
 - `byte` (8-bit signed integer)
 - `short` (16-bit signed integer)
 - `int` (32-bit signed integer)
 - `long` (64-bit signed integer)
 - `char` (16-bit unsigned integer)
 - `float` (32-bit floating point)
 - `double` (64-bit floating point)

So whereas Javascript just has one number type (64-bit floating point), in Java we have five integer types and two floating-point types.

The lack of unsigned integers---especially unsigned bytes---may seem perplexing. Understand, though, that the CPU doesn't really see any difference between signed and unsigned integers! Bits are just bits, and the arithmetic operations work the same regardless. As we'll see later, we can read Java's signed integers as if they're unsigned. As far as the compiler is concerned, however, all the integer types except `char` are signed.

The `char` type is short for 'character' because it is most commonly used for storing individual characters of strings. Strings in Java are stored as UTF-16, and so most characters are represented with 2 bytes. Some characters, however, are 4 bytes in size and so require two `char`'s to store.

Java has no concept of truthy or falsey, so the condition of any `if`, `while`, or `for` must always be a boolean expression.

All non-primitive types---classes, interfaces, enums, and arrays---are ***reference types***.

## variables

A variable is declared by preceding the name with its type:

```java
int n;                 // declare a variable 'n' of type int
boolean b;             // declare a variable 'b' of type boolean
Foo x;                 // declare a variable 'x' of type 'Foo'
Bar y;                 // declare a variable 'y' of type 'Bar'
```

A variable can only store values of its declared type. If we try assigning the wrong type of value to a variable, the compiler gives us an error:

```java
int n = 9;             // OK
boolean b = true;      // OK
n = false;             // compile error: cannot assign false to an int variable
b = 7;                 // compile error: cannot assign 7 to a boolean variable
```

A primtive-type variable stores a value directly, *e.g.* an `int` variable represents a 4-byte memory location where an `int` value is stored.

In contrast, a reference-type variable stores just a reference---an address. So if, say, we assign an instance of class *Foo* to a variable of type *Foo*, the variable stores a reference to the instance rather than the instance itself. The instance is somewhere else in memory: the variable just stores its address.

The compiler will not let you use a variable until it has been initialized (assigned a value for the first time):

```java
int a;
int b = a;         // compile error: 'a' is uninitialized
a = 3;
int c = a;         // OK
```

## casts

A ***cast*** is an operation that returns the equivalent (or approximation) of a primitive value as another primitive type. For example, we can cast an `int` to get its equivalent as a `double`. A cast is denoted by preceding the value with the new type in parens:

```java
int i = 35;
double d = (double) i;      // cast value of 'i' to a double and assign result to 'd'
```

In some cases, casting results in an exactly equivalent value, but in other cases it may distort the value because the new type cannot fully represent the value. For example, integer types cannot store non-integers, so a floating-point value's fractional component gets discarded in the cast to an integer type:

```java
double d = 35.0;
int i = (int) d;          // 35
d = 35.1342;
i = (int) d;              // 35
```

Likewise, casting from a larger type to a smaller type truncates the higher-order bytes:

```java
int i = 35;
byte b = (byte) i;        // 35
i = 3500;
b = (byte) i;             // -84 (the lowest byte of 3500 is the bits 1010_1100, which is -84 as a signed 8 bits)
```

Casts from smaller integer types to larger integer types can be left implicit when assigning or passing arguments:

```java
short s = 50;
int i = s;                // int i = (int) s;
```

Likewise, casts from `float` to `double` and casts from integer types to floating-types can be left implicit:

```java
long l = 1234;
float f = l;              // float f = (float) l;
double d = f;             // double d = (double) f;
```

## arithmetic operators

Because numbers come in different types, we have to be aware what type each arithemtic operation returns. These are the rules:

 - if either operand is a `double`, the operation returns a `double`
 - otherwise, if either operand is a `float`, the operation returns a `float`
 - otherwise, if either operand is a `long`, the operation returns a `long`
 - otherwise, the operation returns an `int`

Surprisingly, this means that an operation on, say, two `byte`'s returns an `int` rather than a `byte` like you would expect:

```java
byte a = 4;
byte b = 9;
byte c = (byte) (a + b);        // 'a' plus 'b' returns an int, so must cast to assign to 'c'
```

## equality operator

When we compare primitives with `==`, the values themselves are compared:

```java
int i = 3;
int j = 3;
boolean b = i == j;      // true (3 is equal to 3)
j = 5;
b = i == j;              // false (3 is not equal to 5)
```

When we compare reference types, only the references are compared:

```java
Cat mittens = new Cat();
Cat fluffy = mittens;
boolean b = mittens == fluffy;        // true ('mittens' and 'fluffy' reference the same instance)
fluffy = new Cat();
b = mittens == fluffy;                // false ('mittens' and 'fluffy' reference different instances)
```

Above, it doesn't matter if two Cat instances have the same field values: a `==` comparing two Cats only returns `true` if both Cats are one and the same instance. To check if the fields of two instances all equal each other, we have to check field-by-field:

```java
boolean equalAge = mittens.age == fluffy.age;
boolean equalWeight = mittens.weight == fluffy.weight;
boolean equalName = mittens.name == fluffy.name;
// ... etc.
```