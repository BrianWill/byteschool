# C control flow

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

C has no `fallthrough` reserved word. Every case in a `switch` automatically falls through to the next, but we can use a `break` statement to stop the fall through. The value on which we switch is enclosed in parens:

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

Unlike Go, the case values must be compile-time expressions. C has no interfaces and therefore nothing like Go's type switch.

## conditions

C has no boolean type, so `if`, `while`, and `for` use integers for their conditions: a non-zero integer indicates true; the integer 0 indicates false.

```c
if (3) {    // this condition is true
    // ...
}

if (0) {    // this condition is false
    // ...
}
```

The equality and relational operators return 1 for true and 0 for false:

```c
int i = 7 > 3;     // assign 1 to 'i'
int j = 5 == 5;    // assign 1 to 'j'
int k = 4 < 2;     // assign 0 to 'k'
```
