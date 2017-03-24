# Go strings

A string value is composed of a reference and a length. The reference points to where the actual text data is stored, and the length indicates the number of bytes of text data.

So when we assign a string to a variable, the text data is a chunk of bytes somewhere in memory, but the variable itself stores just a reference to that chunk and an integer representing the length of the chunk.

```go
// the text data is somewhere in memory; the string variable stores a reference to that chunk and its length
s := "hello"
```

Because string text data is stored as UTF8, some characters may take up more than one byte, and so the number of bytes may not be the same as the number of characters. To get the number of characters in a string, you can use *RuneCountInString* from the *unicode/utf8* package:

```go
package main

import "fmt"
import "unicode/utf8"

func main() {
    s := "hello"
    // the 'fmt.Println' function prints out its arguments to the console
    fmt.Println(len(s))                       // prints: 5 (English characters are single-byte characters)
    fmt.Println(utf8.RuneCountInString(s))    // prints: 5

    s = "世界"
    fmt.Println(len(s))                       // prints: 6
    fmt.Println(utf8.RuneCountInString(s))    // prints: 2
}
```

## concatenating strings

The `+` operator *concatenates* strings, *i.e.* `+` creates a new string containing all the characters (in order) of the two string operands:

```go
s := "hello" + ", there"    // "hello, there"
```
## indexing strings

Use `[]` on strings to read bytes of the text data:

```go
s := "hello"
var b byte = s[0]      // 104  (lowercase 'h' in Unicode)
b = s[1]               // 101  (lowercase 'e' in Unicode)

s = "世界"
b = s[0]               // 228   (the first byte of three-byte character '世')
b = s[1]               // 184   (the second byte of three-byte character '世')
b = s[3]               // 231   (the first byte of three-byte character '界')
```

The bytes of a string cannot be modified:

```go
s := "hello"
s[0] = 65              // compile error: cannot modify bytes of a string
```

## slicing strings

Slicing a string returns a string with the specified range of text data bytes:

```go
s := "hello"
s = s[1:4]            // "ell"

s = "世界"
s2 := s[0:3]          // "世"
s2 = s[2:4)           // "���"  (the 3 bytes do not form valid UTF8 characters)
```

(How exactly invalid UTF8 text data gets displayed depends upon the program displaying the data.)

## casting between strings and byte slices

We can cast between strings and byte slices. Because strings are meant to be immutable, casting between strings and byte slices always copies the bytes. Effectively, a string and a byte slice never share bytes:

```go
s := "hello"
var b []byte = []byte(s)    // the new []byte has its own copy of the string's bytes
b[0] = 72                   // does not affect the string
s2 := s                     // "hello"
s = string(b)               // "Hello"     (72 is capital 'H' in Unicode)
b[0] = 90                   // does not affect either string
s2 = s                      // "Hello"
```

## string equality and relational comparisons

We can use `==` to compare strings for equality:

```go
s := "hi"
s2 := "hi"
s3 := "yo"
b := s == s2       // true
b = s == s3        // false
```

The relational operators, `<` and `>`, compare the first non-equal character of the two strings by their Unicode values:

```go
s := "hit"
s2 := "hiss"
b := s < s2         // false ("t" is not less than "s")
b = s > s2          // true ("t" greater than "s")

```

## casting strings to rune (int32) slices

Unicode codepoints are sometimes called *runes*. The type which Go calls `rune` is simply an alias for `int32`.

Casting a string to a slice of runes produces a slice wherein each rune represents the codepoint of each character in the string:

```go
s := "世界"
a := len(s)      // 6
r := []rune(s)
b := len(r)      // 2
c := r[0]        // 19990 (the codepoint of 世)
d := r[1]        // 30028 (the codepoint of 界)
```

(Note that casting to `[]int32` is exactly equivalent. `rune` and `int32` are one and the same type.)

## character constants

We can express the integer values of Unicode characters by enclosing a character in single-quotes:

```go
x := 'H'            // var x rune = 72 
y := '世'           // var y rune = 19990
z := 'H' + '世'     // var z rune = 72 + 19990
```

Like other integer constants, these character constants have no specific type:

```go
var i int = 'H'        // var i int = 72
var j uint8 = '世'     // compile error: 19990 is not a valid uint8 value
```
