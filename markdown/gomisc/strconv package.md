# Go `strconv` package

The `strconv` ('string conversion') package provides functions for converting between strings and the other basic types of Go. We'll cover the functions that convert between strings and numbers.

## converting numbers to strings

```go
func FormatInt(i int64, base int) string
func FormatUint(i uint64, base int) string
```

The `strconv.FormatInt` and `strconv.FormatUint` functions take a 64-bit integer and a number base as input, returning a string representation of the integer in that number base. (The number base can be anything from 2 up to 36. The lowercase letters 'a' to 'z' are used for numerals past '9'.)

```go
var i int64 = -5
x := strconv.FormatInt(i, 10)            // "-5"      
y := strconv.FormatInt(i, 2)             // "-101"

var u int64 = 5
x = strconv.FormatUint(u, 10)             // "5"
y = strconv.FormatUint(u, 2)              // "101"
```

To convert other sizes of integers to strings, simply cast them to their 64-bit equivalents:

```go
var i int8 = -5
x := strconv.FormatInt(int64(i), 10)     // "-5" 
```

```go
func FormatFloat(f float64, fmt byte, precision int, bitSize int) string
```

The `strconv.FormatFloat` function returns the decimal string representation of a floating-point value. The *fmt* byte denotes how the exponent is represented:

- 'b' (binary exponent, separated by 'p')
- 'e' (decimal exponent, separated by 'e')
- 'E' (decimal exponent, separated by 'E')
- 'f' (no exponent: written out in full up to the specified precesion)
- 'g' (like 'e' if the exponent is large, but otherwise like 'f')
- 'E' (like 'E' if the exponent is large, but otherwise like 'f')

The precision specifies the number of digits to represent the value, with the value -1 specially signifying to use the minimum number of digits necessary.

Though the input value is always a `float64`, we can tell the function to interpret it as 32-bit value by passing `32` as the *bitSize* argument. Otherwise, we pass `64` as the *bitSize*.

```go
v := 3.1415
x := strconv.FormatFloat(v, 'f', 10, 64)      // "3.1415000000"
y := strconv.FormatFloat(v, 'f', -1, 64)      // "3.1415"
```

## converting strings to numbers

```go
func ParseInt(s string, base int, bitSize int) (i int64, err error)
func ParseUint(s string, base int, bitSize int) (uint64, error)
func ParseFloat(s string, bitSize int) (float64, error)
```

The `strconv.ParseInt` function parses a string into an `int64` value. Along with the string, we pass in a number base and a bit size. The string should consist only of characters making up a single integer of the specified number base and bit size cannot be parsed from the string; otherwise, a non-nil error is returned:

```go
s :=  "-8724"
i, err := strconv.ParseInt(s, 10, 16)
if err != nil {
    // ... string was invalid for parsing a decimal signed 16-bit integer
}
```

Above, an error would be returned if we had input any of the following strings:

 - `"-8724.9"` (must be an integer)
 - `" -8724"` (cannot lead with spaces)
 - `"-8724 "` (cannot trail with spaces)
 - `"bla -8724"` (cannot have any characters that aren't part of the number)
 - `"-872412423123"` (exceeds the range of a 16-bit signed integer)