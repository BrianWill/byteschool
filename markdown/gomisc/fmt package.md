# Go `fmt` package

The `fmt` (short for 'format' and pronounced 'FUHMT') package includes functions for 'formatted' I/O. These functions take a string and zero or more other arguments. The string acts as a template in which 'verbs' (escape sequences denoted by percentage signs) get replaced by other values in the final output. The different verbs denote different formatting. Here are most of the verbs:

 - `%d` (decimal integer)
 - `%b` (binary integer)
 - `%x` (hexadecimal integer)
 - `%c` (character corresponding to codepoint integer)
 - `%e` (engineering notation)
 - `%f` (decimal point, but no exponent)

Because `%` denotes a verb, we have to write `%` itself as `%%`.

See the [`fmt` package documentation](https://golang.org/pkg/fmt/) for full details about the verbs.

### Printf

The `fmt.Printf` ('print formatted') function writes a string to standard output. It is a variadic function taking empty interfaces values, but the first argument should be a string, and the additional arguments are meant to replace the verbs in the string.

```go
// writes to standard output: "My dog is 5 years old and weighs 14.360000 kilograms."
fmt.Printf("My dog is %d years old and weighs %f kilograms.", 5, 14.36)
```

By default, the `%f` verb uses 6 digits of precision past the decimal point. We can specify a different precision using `.` and a number:

```go
// writes to standard output: "My dog is 5 years old and weighs 14.360 kilograms."
fmt.Printf("My dog is %d years old and weighs %.3f kilograms.", 5, 14.36)           // 3 digits of precision
```

If the first argument to `fmt.Printf` is not a string, we get a panic. If the number of arugments does not match the number verbs, we get error messages in the output:

```go
// writes to standard output: "My dog is 5 years old and weighs %!f(MISSING) kilograms."
fmt.Printf("My dog is %d years old and weighs %f kilograms.", 5)
```

The `fmt.Printf` function returns the number of bytes written to standard output and error. Though writing to standard output *can* fail (just like writing to any file), it should fail only under very unusual circumstances, so we usually don't check for errors after writing to standard output.

### Print, Println

The `fmt.Print` function is a variadic function taking empty interface values. Using reflection, `fmt.Print` generates a textual representation appropriate for each argument and writes the text to standard output.

The `fmt.Println` function is just like `fmt.Print` but adds a newline at the end.

### Scanf, Scan, Scanln

The `fmt.Scan` function is a variadic function taking empty interface values. The function expects pointer arguments, and using reflection it figures the types of pointers; it then reads from standard input until it can parse enough values of the corresponding types; the values are stored in the locations referenced by the pointers. The parsed values are expected to be separated by whitespace. If the parsed text doesn't match the expected data types, en error is returned. The function will not return until it has read all the values or until an error occurs. For example:

```go
var i int
var f float32
err := fmt.Scan(&i, &f)       
if err != nil {
    // ... problem reading from standard input or the text could not be parsed into the expected types
}
// assume user entered: "62 -3.2"
fmt.Print(i, f)         // prints: "62 -3.2"
```

The `fmt.Scanln` function is like `fmt.Scan` but expects a newline to follow the last parsed value.

The `fmt.Scanf` function is like `fmt.Scan`, but it takes a format string. It expects the text read from standard input to match the format string, with parsed values corresponding to the verbs:

```go
var i int
var f float32
err := fmt.Scanf("My cat is &i years old and weighs &f kilograms.")
if err != nil {
    // ... problem reading from standard input or the text did not match the format string
}
// assume user entered: "My cat is 62 years old and weighs -3.2 kilograms."
fmt.Print(i, f)         // prints: "62 -3.2"
```

### file variants

All of the functions introduced above have variants beginning with `F`, standing for 'file': `fmt.Fprintf`, `fmt.Fprint`, `fmt.Fprintln`, `fmt.Fscanf`, `fmt.Fscan`, `fmt.Fscanln`. Rather than write to standard output, these print variants write to an `io.Writer`, and rather than read from standard input, these scan variants read from an `io.Reader`. For example:

```go
// assume file 'f'
err := fmt.Fprint(f, 35, "Hello", false)      // write these values to the file 'f'
if err != nil {
    // ... the write failed
}
```

We should always check for errors returned by these `F` variants.

### string variants

We also have variants of the `fmt` functions beginning with `S`, standing for 'string': `fmt.Sprintf`, `fmt.Sprint`, `fmt.Sprintln`, `fmt.Sscanf`, `fmt.Sscan`, `fmt.Sscanln`. Rather than write to standard output, these print variants return a string, and rather than read from standard input, these scan variants read a string argument. For example:

```go
s := fmt.Sprint(35, "Hello", false)           // "35Hellofalse"
```

The `S` print variants do not return errors, but the `S` scan variants do (because maybe the string doesn't have enough things to scan). 

