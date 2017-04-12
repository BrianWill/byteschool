# Go `io/ioutil` package

The `io/ioutil` package contains several convenience functions for io.

```go
func ReadAll(r io.Reader) ([]byte, error)
```

The `ioutil.ReadAll` function reads all the bytes of an `io.Reader`, returning a non-nil error if an error occurs before reaching end of file.

```go
func ReadFile(filename string) ([]byte, error)
```

The `ioutil.ReadFile` is like `ReadAll` but takes a file path and opens and closes the specified file.

```go
func ReadDir(dirname string) ([]os.FileInfo, error)
```

The `ioutil.ReadDir` function reads the entries in a directory, returning a slice of `os.FileInfo`.

```go
func TempDir(dir, prefix string) (name string, err error)
```

The `ioutil.TempDir` function creates a new directory. We specify the parent directory and a prefix for the name, but the rest of the name is chosen randomly.

```go
func TempFile(dir, prefix string) (f *os.File, err error)
```

The `ioutil.TempDir` function creates an opens a new file. We specify the parent directory and a prefix for the name, but the rest of the name is chosen randomly.

```go
func WriteFile(filename string, data []byte, perm os.FileMode) error
```

The `ioutil.WriteFile` function writes data to a filepath. If the file does not already exist, it is created with the specified permissions.