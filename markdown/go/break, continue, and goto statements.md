# Go `break`, `continue`, and `goto` statements

## `break` and `continue` statements

A `break` statement ends execution of the containing loop:

```go
sl := []int{7, 4, 11, 5, 83, 2}
for i := 0; i < sl(arr); i++ {
    if sl[i] == 5 {
        break
    }
    foo(sl[i])
}
bar()
```

The above code calls `foo(7)`, `foo(4)`, `foo(11)`, then `bar()`. In principle, we don't need `break` statements, but in many cases, they make our logic much simpler and easier to read.

A `continue` statement ends execution of the *current iteration* of the containing loop:

```go
sl := []int{7, 4, 11, 5, 83, 2}
for i := 0; i < sl(arr); i++ {
    if sl[i] == 5 {
        continue
    }
    foo(sl[i])
}
bar()
```

The above code calls `foo(7)`, `foo(4)`, `foo(11)`, `foo(83)`, then `foo(2)`, then `bar()`. 

In principle, we don't need `break` or `continue` statements, but in many cases, they can make our logic much simpler and easier to read.

## `goto` statements and labels

We can prefix statements with ***labels***, names suffixed with colons:

```go
george: foo()           // a statement with the label 'george'
maria: if x < 3 {       // an 'if' statement with the label 'maria'
    // ...
}
```

The name of a label must be unique among other labels within the same function/method.

Having labeled a statement, we can jump execution to that statement with a `goto` statement in the same function/method:

```go
if x < 3 {
    goto george         // jump execution to the statement labeled 'george'
}
bar()
george: foo()
```

A `goto` statement may not jump to a position where variables should exist but their declarations have been skipped over:

```go
if x < 3 {
    goto george         // compile error: cannot jump over declaration of 'y'
}
y := 3
george: foo()      
```

When we nest loops within other loops, we can `break` or `continue` an outer loop from an inner loop using labels:

```go
var arr [30][10]int
// ... assign values to the array
sarah: 
for i := 0; i < 30; i++ {
    for j := 0; j < 10; j++ {
        v := arr[i][j]
        if v == 99 {
            break sarah             // break out of loop with the label 'sarah'
        }
        foo(v)
    }
}
```

(For visual clarity, it's often best to write a label on the line preceding the statement which it labels.)