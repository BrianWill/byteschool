# Go `io` package

The `io` package defines a few interfaces used in many other packages of the standard library and commonly used in our own code. When creating a function or method that reads or writes bytes, using these interfaces enables the code to work generically for any source or receptacle of bytes.

We'll cover `io`'s most essential types and functions.

## the `Reader` interface

```go
type Reader interface {
        Read(p []byte) (n int, err error)
}
```

The `Read` method reads bytes from some data stream into the slice of bytes and returns the number of bytes actually read (which may be less than the length of the slice and even zero). The error value `io.EOF` is returned to indicate the data stream has no more bytes to read.

## the `Writer` interface

```go
type Writer interface {
        Write(p []byte) (n int, err error)
}
```

The `Write` method writes the bytes of the slice to some data stream and returns the number of bytes actually written (which may be less than the length of the slice and even zero). If the number of bytes written is less than the length of the slice, the returned `error` should be non-nil.

## the `Closer` interface

```go
type Closer interface {
        Close() error
}
```

The `Close` method closes a source or receptacle of bytes. Generally, reads and writes after closing should return errors.

## the `Seek` interface

```go
type Seeker interface {
        Seek(offset int64, whence int) (int64, error)
}
```

## combination interfaces

We often deal with types that implement combinations of the above, so we have these interfaces:

 - `WriteCloser` (`Write` and `Close`)
 - `WriteSeeker` (`Write` and `Seek`)
 - `ReadCloser` (*etc.*)
 - `ReadSeeker`
 - `ReadWriter`
 - `ReadWriteCloser`
 - `ReadWriteSeeker`

## `io` functions

```go
func Copy(dst Writer, src Reader) (written int64, err error)
```

The `io.Copy` function writes bytes to *dst* by reading from *src* until reaching end of file, returning the number of bytes written. If an error (other than end of file) occurs in reading or writing, the returned `error` is non-nil.

```go
func CopyN(dst Writer, src Reader, n int64) (written int64, err error)
```

The `io.CopyN` function is just like `io.Copy` but copies only the number of bytes specified.

```go
func ReadFull(r Reader, buf []byte) (n int, err error)
```

The `io.ReadFull` function tries to read the full length of the buffer, returning the number of bytes actually read and an error. The error is non-nil if the number of bytes read is less than the length of the buffer.

## wrapped Readers and Writers

A common trick with Readers and Writers is to wrap them so as to modify the way the bytes get read or written. For example, in the `io` package, we have the `io.TeeReader` function:

```go
func TeeReader(r Reader, w Writer) Reader {
    return &teeReader{r, w}
}
 
type teeReader struct {
    r Reader
    w Writer
}
 
func (t *teeReader) Read(p []byte) (n int, err error) {
    n, err = t.r.Read(p)
    if n > 0 {
        if n, err := t.w.Write(p[:n]); err != nil {
            return n, err
        }
    }
    return
}
```

The `io.TeeReader` function returns an `io.Reader` with a `Read` method which writes any bytes read to an `io.Writer`.
