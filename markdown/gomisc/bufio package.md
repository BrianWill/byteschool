# Go `bufio` package

The `bufio` package provides three types for wrapping readers and writers with buffered IO: `bufio.Reader`, `bufio.Writer`, and `bufio.Scanner`.

## `bufio.Reader`

The `bufio.NewReader` function wraps an `io.Reader` as a `bufio.Reader`. Calls to the `Read` method reads bytes from the `bufio.Reader`'s buffer, and when the number of bytes left in the buffer falls below a threshold, data is read into the buffer from the underlying `io.Reader`. In other words, rather than reading from a data source directly, data is copied from the underlying source to a buffer, and then read from the buffer. 

This indirection is extra work, but it's most optimal to read from some kinds of data sources in large chunks rather than small chunks. If our code logic prefers reading smaller chunks of data, performance is often improved by using a buffer: our code reads from the buffer in small chunks, but the buffer reads from the data source in large chunks.

## `bufio.Writer`

The `bufio.NewWriter` function wraps an `io.Writer` as a `bufio.Writer`. Calls to the `Write` method copies bytes into the `bufio.Writer`'s buffer, and when the number of bytes in the buffer exceeds a threshold, data is written from the buffer to the underlying `io.Writer`.

Again, this indirection is extra work, but it's most optimal to write to some kinds of data receptacles in large chunks rather than small chunks. If our code logic prefers writing smaller chunks of data, performance is often improved by using a buffer: our code writes to the buffer in small chunks, but the buffer writes to the data receptacle in large chunks.

## `bufio.Scanner`

The `bufio.NewScanner` function wraps an `io.Reader` as a `bufio.Reader`. A scanner splits the data it reads into tokens.

 - How the splitting is performed is determined by a the scanner's split function. The default split function splits on newlines, but we can set a different split function with the `Split` method.
 - The `Scan` method reads the next token into the buffer. It returns `false` when end of file is reached or when an error occurs.
 - The `Err` method returns any error that occured after the last scan.
 - The `Bytes` method returns the last scanned token as a slice of bytes.
 - The `Text` method returns the last scanned token as a string.

A common use of `bufio.Scanner` is to read lines from standard input:

```
package main

import (
    "bufio"
    "os"
)

func main() {
    in := bufio.Scanner(os.Stdin)
    if in.Scan() {
        line := in.Text()
        fmt.Println(line)        // echo the line typed by the user
    } else {
        err := in.Err()
        if err != nil {
            fmt.Println(err)     // print the error
        }
    }
}
```

We could use the `ReadString` method of `bufio.Reader` for the same purpose, but using a scanner is generally preferred.