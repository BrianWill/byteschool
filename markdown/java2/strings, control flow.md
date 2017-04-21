# Java strings and control flow

## strings

A string in Java is an instance of the standard library class `java.lang.String`:

```java
String s = "hello";
```

The String class has many methods for working with Strings, such as *toUpperCase*, which returns a new string with all of the letters uppercase:

```java
String s = "Hello, there!";
s = s.toUpperCase();             // "HELLO, THERE!"
```

We cannot use the `[]` operator on strings; instead, use the *charAt* method:

```java
String s = "Hello, there!";
char c = s.charAt(4);            // 111 (the Unicode value for lowercase 'o')
```

## `if`, `for`, `while`, `do-while`, and `switch` statements

The condition of an `if` must always be surrounded in parentheses:

```c
if (x < 3) {
    // ...
}
```

A `for` loop also must have parens:

```c
for (int i = 0; i < 12; i++) {
    // ...       
}
```

A `for` can omit the pre-condition and/or post-condition, but the condition must always be surrounded in semi-colons:

```c
// no pre-condition or post-condition
for (; i < 12;) {
    // ...       
}
```

A `while` loop is like a `for` loop but has no pre-condition or post-condition:

```c
while (i < 12) {
    // ...       
}
```

A `do-while` loop is like `while` but the body is always executed at least once. The condition is first tested after the first iteration:

```c
do {
   // ...    
} while (x < 5);     // note the semi-colon
```

Java has no `fallthrough` reserved word. Every case in a `switch` automatically falls through to the next, but we can use a `break` statement to stop the fall through. The value on which we switch is enclosed in parens:

```c
switch (x) {
case 3:
    // ...
    break;    // stops fall through to next case
case 7:
    // ... without break, execution falls through to next case
case 11:
    // ...
}
```

Unlike Go, the case values must be compile-time expressions. Though Java has interfaces like Go, it has no equivalent of a type switch.
