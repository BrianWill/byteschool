
## increment and decrement statements

Because adding `1` or subtracting `1` from an integer variable is so common, Go allows shorthand statements with `++` (increment) and `--` (decrement):

```
i := 4
i++       // i = i + 1
i--       // i = i - 1
```

## `for` loop pre-conditions and post-conditions

As a convenience, `for` loops can be written in this form:

```
for precondition; condition; postcondition {
    body
}
```

The pre-condition is a declaration and assignment using the `:=` syntax. It is executed once, at the start of the loop before the condition is first tested.

The post-condition is an assignment or increment/decrement operation. It is executed every time after the body is executed but before the condition is tested again. (If the condition is false the first time, the post-condition is skipped over entirely like the rest of the body.)

This variant of `for` is handy for looping through a range of integers:

```
// this loop calls 'foo' with the values: 0 1 2 3 4
for i := 0; i < 5; i++ {
    foo(i)
}
```

With a normal `for`, the same thing would be written:

```
i := 0
for i < 5 {
    foo(i)
    i++   
}
foo(i)        // calls 'foo' with argument 5
```

The above code is exactly the same except for one subtle difference: when the variable is declared in the pre-condition, it belongs to the scope of the `for` body:

```
for i := 0; i < 5; i++ {
    foo(i)
}
foo(i)        // compile error: 'i' does not exist in this scope
```

