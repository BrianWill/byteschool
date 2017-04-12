# the `strings` package

The standard library package `strings` contains a few dozen functions for operating on strings. It also contains a `Reader` type. We'll cover this type and a few of the most essential functions:

## Contains, ContainsAny

The `strings.Contains` function returns true if the first string contains the second string:

```go
strings.Contains("Hello, there!", "the")         // true
strings.Contains("Hello, there!", "The")         // false
```

The `strings.ContainsAny` function returns true if the first string contains any of the characters in the second string:

```go
strings.Contains("Hello, there!", "as,df")       // true
strings.Contains("Hello, there!", "abc")         // false
```

## Index, IndexAny, LastIndex

The `strings.Index` function returns the index of the first occurrence of a substring within another string. If the substring is not found, the function returns `-1`:

```go
a := strings.Index("Hello, there!", "the")       // 7
b := strings.Index("Hello, there!", "The")       // -1
c := strings.Index("Hello, there!", "e")         // 1 (multiple occurrences, but first is at index 1)
```

The `strings.IndexAny` function returns the index of the first occurrence of any character of a string within another string. If none are found, the function returns `-1`:

```go
a := strings.IndexAny("Hello, there!", "bclr")   // 2 (index of the first 'l')
```

The `strings.LastIndex` is like `strings.Index` but returns index of the last occurrence:

```go
a := strings.Index("Hello, there!", "e")         // 11 (multiple occurrences, but last is at index 11)
```

## ToUpper, ToLower

These functions return a new srting with all the characters uppercased or lowercased:

```go
a := "FooBar"
b := strings.ToUpper(a)                          // "FOOBAR"
c := strings.ToLower(a)                          // "foobar"
```

## Trim, TrimLeft, TrimRight

The `strings.Trim` function removes leading and trailing characters specified in a second string:

```go
a := strings.Trim("   bla   ", " ")              // "bla" (trimmed spaces)
b := strings.Trim("   blabla   ", " b")          // "labla" (trimmed spaces and 'b's)
```

The `strings.TrimLeft` function removes just leading characters. The `strings.TrimRight` function removes just trailing characters:

```go
a := strings.TrimLeft("   bla   ", " ")          // "bla   "
b := strings.TrimRight("   bla   ", " ")         // "   bla"
```

## Split, SplitAfter, Count

The `strings.Split` function splits the string using a second string as the separator and returning a slice of strings. If the separator string is empty, returns a slice of all the characters as individual strings:

```go
a := strings.Split("foo: bar: ack", ":")         // []string{"foo", " bar", " ack"}
b := strings.Split("foo: bar: ack", ": ")        // []string{"foo", "bar", "ack"}
c := strings.Split("goose moose", "oo")          // []string{"g", "se m", "se"}
d := strings.Split("ABCDEFG", "")                // []string{"A", "B", "C", "D", "E", "F", "G"}
```

The `strings.SplitAfter` function is like `strings.Split` but includes the separator in the returned strings:

```go
a := strings.Split("foo: bar: ack", ":")         // []string{"foo:", " bar:", " ack"}
b := strings.Split("foo: bar: ack", ": ")        // []string{"foo: ", "bar: ", "ack"}
c := strings.Split("goose moose", "oo")          // []string{"goo", "se moo", "se"}
d := strings.Split("ABCDEFG", "")                // []string{"A", "B", "C", "D", "E", "F", "G"}
```

The `strings.Count` function returns the number of strings that would be returned by `strings.Split`.

```go
a := strings.Count("foo: bar: ack", ":")         // 3
b := strings.Count("foo: bar: ack", ": ")        // 3
c := strings.Count("goose moose", "oo")          // 3
d := strings.Count("ABCDEFG", "")                // 7
```

## Repeat

The `strings.Repeat` function returns a new string repeating the characters of a string some number of times:

```go
a := strings.Repeat("foobar", 3)                 // "foobarfoobarfoobar"
b := strings.Repeat("ABC DEF", 2)                // "ABC DEFABC DEF"
```

## Join

The `strings.Join` function returns a new string given an array of strings and a separator string to join between each of them. (In a sense, `strings.Join` is like the opposite of `strings.Split`.)

```go
a := []string{"foo", "bar", "ack"}
b := strings.Join(a, ", ")                       // "foo, bar, ack"
```

## the Reader type

The `string.NewReader` function takes a string argument and returns a type that implements several interfaces from the `io` package: `io.Reader`, `io.ReaderAt`, `io.Seeker`, `io.WriterTo`, `io.ByteScanner`, and `io.RuneScanner`. The `Read` method reads data from the underlying string.






