# Go `flag` package

The `os` package's global variable `os.Args` is a slice of strings storing the program arguments (starting with the name of the program itself.) The `flags` package parses 'flags' and their values from the program arguments.

By convention, many programs that read their program arguments expect some arguments to be preceded by a 'flag', a name prefixed with one or two hyphens. For example, if a program expects a file path as an argument, it might expect the preceding argument to be the string `"--path"`, or `"-path"`, or `"--p"`, or `"-p"`. For example:

```
# in a shell...
foo -bar 35 -ack hi        # launch program 'foo' with flag 'bar' having the value "35" and flag 'ack' having the value "hi"
```

Alternatively, a flag and its value can be written as a single program argument with an `=` sign between the flag and value:

```
# in a shell...
foo -bar=35 -ack=hi
```

For a flag indicating a boolean (yes/no) option, the flag needs no accompanying value: the presence of the flag indicates 'yes'; the absence of the flag indicates 'no'.

The `flags` package is adequate for many programs, but some programs need to do more complicated argument parsing. Many Go programmers prefer instead to use alternative non-standard libraries, such as [go-arg](https://github.com/alexflint/go-arg).

## flag.Parse, flag.String, flag.Int, flag.Float64

The `flag.Parse` function parses the program arguments of `os.Args` into a set of flags. Before calling `flag.Parse`, we specify what flags are expected with `flag.String`, `flag.Int`, `flag.Float64` and a few other similar functions. The first argument to these functions is a string denoting the name of the flag; the second argument is the default value for when the flag is not in the program arguments; the third argument is a 'usage string' (an error message printed out on the command line if the wrong kind of value is supplied for the flag). These functions return a pointer representing the location where the parsed value is stored after parsing.

```go
usage := "Do better."
var foo *string = flags.String("foo", "something", usage)     // expecting string value for flag "foo" with default value "something"
var bar *int = flags.Int("bar", 35, usage)                    // expecting int value for flag "bar" with default value 35
var ack *float64 = flags.Float64("ack", 71.3, usage)          // expecting float64 value for flag "ack" with default value 71.3
flags.Parse()
fmt.Println(*foo, *bar, *ack)                                 // print the parsed values of the flags
```

If the value passed for a flag cannot be parsed as the expected type, `flags.Parse` panics.