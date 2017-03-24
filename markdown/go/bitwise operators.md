# Go bitwise operators

The binary `&` operator performs a bitwise 'and' between two integers of the same type. The result of a bitwise 'and' has a 1 in any position where both inputs have a 1:

```go
var a byte = 131          // 1000_0011
var b byte = 25           // 0001_1001
var c byte = a & b        // 0000_0001  (decimal 1)
```

Above, only the least-significant bits of the inputs were both 1's, so all other bits in the result are 0's.

The binary `|` operator performs a bitwise 'or' between two integers of the same type. The result of a bitwise 'or' has a 1 in any position where either (or both) inputs have a 1:

```go
var a byte = 131          // 1000_0011
var b byte = 25           // 0001_1001
var c byte = a | b        // 1001_1011  (decimal 155)
```

Above, five of the bits had a 1 bit in one or both of the inputs.

The binary `^` operator performs a bitwise 'exclusive or' between two integers of the same type. The result of a bitwise 'exclusive or' has a 1 in any position where one input (and *only* one input) has a 1:

```go
var a byte = 131          // 1000_0011
var b byte = 25           // 0001_1001
var c byte = a ^ b        // 1001_1010  (decimal 154)
```

Above, the least-signifcant bits of both inputs were 1's, so the result does not have a 1 in that position.

The unary `^` operator performs a bitwise 'negation' on an integer. The result of a bitwise 'negation' has all the bits of the input flipped:

```go
var a byte = 131          // 1000_0011
var b byte = ^a           // 0111_1100  (decimal 124)
```

The binary `&^` operator performs a 'bit clear', which is simply a convenient combination of 'and' and 'negation':

```go
var a byte = 131          // 1000_0011
var b byte = 25           // 0001_1001
var c byte = a &^ b       // 1000_0010  (decimal 130)
var d byte = a & ^b       // same as previous
```

(Even if Go had no 'bit clear' operator, writing `&` and `^` with no space in between would still do the same thing! The authors of Go simply decided that `&` with `^` is a common enough thing to warrant a single operator.)