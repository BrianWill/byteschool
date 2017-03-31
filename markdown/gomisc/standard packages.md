# overview of Go's standard packages

Go's standard library contains over 100 packages encompassing many common needs. Notably, while Go has a few standard packages for creating image files, it has no standard packages for drawing on the screen, nor creating windows, nor processing audio. For such purposes, you'll need to use non-standard packages or link against platform API's directly (which are typically written in C or C++).

## packages

### os

The `os` package provides essential system capabilities, like reading and writing files and starting processes. The package abstracts over the system calls, such that it works and behaves the same on all platforms. 

### io

The `io` package defines several interfaces for reading and writing. The *os.File* struct, for example, implements *io.Reader* and *io.Writer*.

### bufio

The `bufio` ('buffered io') package provides wrappers of *io.Reader* and *io.Writer*. These wrappers read and write to buffers in the process memory, which is sometimes beneficial for performance.

### ioutil

The `ioutil` package provides a few additional convenience functions for reading and writing files.

### fmt

The `fmt` ('formatted') package provides ways of formating data as it is read and written.

### errors

The `errors` package provides a function `New` that returns an `error` value with a string message.

### bytes

The `bytes` package provides many functions for manipulating byte slices. It also provides the *Buffer* type, which represents a byte slice and implements *io.Reader* and *io.Writer*.

### encoding

The `encoding` package encodes and decodes data in several basic formats, including base64, CSV, JSON, and XML.

### archive/tar, archive/zip

The `archive/tar` and `archive/zip` packages read and write tar and zip files, respectively. (An archive file is a single file that contains the data of multiple other files. A tar file is an uncompressed archive file. A zip file is a compressed archive file.)

### compress

The `compress` package compresses and decompresses data with the most popular lossless compression algorithms.

### database/sql

The `database/sql` package makes SQL queries to a database.

### image, image/color, image/draw

Thes packages contain types for representing and manipulating images in memory. (These packages do not display the images on screen.)

### image/gif, image/jpeg, image/png

These packages encode and decode images in the gif, jpeg, and png formats.

### crypto

The `crypto` packages encrypt and decrypt data using popular encrytption algorithms. They also can generate cryptographic hashes using popular algorithms, like SHA and MD5.

### crypto/rand, math/rand

Both `crypto/rand` and `math/rand` both generate random numbers, but only `crypto/rand` is suitable for encryption purposes. Using `math/rand` is more efficient, but using it to generate encryption keys is a bad idea.

### math

The `math` package contains mathematical constants, like *pi* and *e*, and mathematical functions, like *sin* and *cos*.

### math/big

The `math/big` package provides types for representing arbitrary-precision numbers and performing arithmetic on them.

### net

The `net` package sends and receives data over TCP and UDP.

### net/http

The `net/http` package sends and receives data over HTTP.

### path, path/filepath

The `path/filepath` package manipulates filepaths in a way that abstracts over the differences between filepaths on Windows and Unix.

### regexp

The `regexp` package provides [regular expression](https://en.wikipedia.org/wiki/Regular_expression) textual pattern matching.

### sort

The `sort` package provides an implementation of the quicksort algorithm for sorting slices.

### strings

The `strings` package provides many functions for manipulating strings.

### strconv

The `strconv` package provides many functions for converting between strings and other types. For example, we can convert the string "42" to the int value 42.

### sync

The `sync` package provides synchronization primitives for multithreading.

### testing

The `testing` package helps write automated tests (code that checks the correctness of other code).

### time

The `time` package provides types representing dates and times and functions for reading the system clock and timers.

## special packages

These five special packages do not contain ordinary Go code: they provide functionality we would not have access to in Go if the language did not provide them for us:

### syscall

The `syscall` package contains functions for invoking system calls. Unlike every other standard library package, the `syscall` package differs from one platform to the next, *e.g.* the Linux `syscall` package and the Windows `syscall` package contain different functions.

Normal Go programs should generally use other standard packages instead of using `syscall` directly.

(The `syscall` packages have actually been deprecated. Since Go 1.4, you should use the replacement `golang.org/x/sys` packages.)

### builtin

The `builtin` package does not actually exist and has no code. This 'package' is in the documentation simply to document Go's built-in types and functions, such as `int64`, `make`, and `append`. Importing `builtin` triggers a compile error.

### reflection

Using a type assertion, we can check if an interface value references a specific type of concrete value. Sometimes, though, we want to query the type of an interface value. Is this an array? Is this a slice? Is it a function? If so, what are the parameters and return type? Is this a channel? If so, a channel of what? *Etc.*

The `reflection` package lets us do such 'runtime discovery' of the types of interface values. The *fmt.Println* function, for example, uses reflection to discover the concrete types of its empty interface parameters and thereby create text representations appropriate to each.

### C, unsafe

If we compile our code with the special `cgo` tool, our Go code can call functions written in C. To refer to these functions by name, our Go code imports the special package `C`, *e.g.* to call a C function called `foo`, we would refer to it by name by importing package `C` and writing `C.foo`.

Unlike Go code, C code is not garbage collected, and C's data types do not exactly match those in Go. The `unsafe` package helps us bridge these differences when calling C code from Go.
