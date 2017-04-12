# Go `os` package

The `os` package provides cross-platform access to essential system functionality:

 - creating, renaming, and removing files and directories
 - reading and writing files
 - reading and setting file/directory ownership and permissions
 - reading and setting the environment variables
 - reading the process user and group id's
 - starting and managing other processes
 - sending signals to processes

For starting and managing processes, the package `os/exec` is a bit simpler to use.

The global variable `os.Args` is a slice of strings storing the program arguments. The first string is always the name of the executable itself.

We'll look here just at reading and writing files. The rest is easy enough to look up in the [`os` package documentation](https://golang.org/pkg/os/).

If the `os` package seems oddly complicated and if many of its names seem ugly, keep in mind that the `os` package is designed to resemble the Unix platform libraries familiar to C programmers. A package that totally ditched the legacy of Unix and C would be easier to learn, but in this case, the authors of Go favored familiarity for experienced progammers. Worse, the package's documentation leaves a lot of details unspecified; to fill in these details, consult documentation on the Linux system calls.

Before understanding function `os.OpenFile`, we first must understand bit flags and how to use octal digits to designate Unix file permissions:

## bit flags

When we have many yes/no values to represent, rather than use booleans, it's common to use the individaul bits of an integer to represent these values. These are called ***bit flags***.

Consider that any power of two integer has just a single set bit:

```
0000_0001    (decimal 1)
0000_0010    (decimal 2)
0000_0100    (decimal 4)
0000_1000    (decimal 8)
0001_0000    (decimal 16)
0010_0000    (decimal 32)
0100_0000    (decimal 64)
1000_0000    (decimal 128)
```

If we bitwise or together powers of two, we get a number that is the combination of the bits represented by those powers:

```go
var b byte = 4 | 16 | 128         // 1001_0100  (has just the bits represented by 4, 16, and 128)
```

(The order of the numbers we 'or' together does not matter: the result would be the same.)

Given a number, we can test whether it has an individual bit set by bitwise and'ing it with the power of two representing that bit:

```go
var b byte = 79
var hasBit16 bool = (b & 16) > 0
```

So say we are dealing with many yes/no values, like the ingredients of a sandwich. Rather than use booleans, we define power of two constants denoting all the options:

```go
const (
    lettuce = 1
    tomato = 2
    mustard = 4
    mayonaisse = 8
    cheese = 16
    pepper = 32
    salt = 64
)
```

We can these represent seven yes/no values in a single byte:

```go
var ingredients byte = lettuce | tomato | cheese | salt   // hold the mustard, mayonaisse, and pepper
```

## octal numbers designating file permissions

Every file and directory in Unix has nine yes/no permissions, expressed in this order:

- owning user can read
- owning user can write
- owning user can execute
- owning group can read
- owning group can write
- owning group can execute
- non-owners can read
- non-owners can write
- non-owners can execute

The convention in Unix is to use three octal digits to represent these nine bits. Just like one hex digit corresponds directly to four binary digits, one *octal* digit corresponds directly to *three* binary digits:

 - octal 0 = binary 000
 - octal 1 = binary 001
 - octal 2 = binary 010
 - octal 3 = binary 011
 - octal 4 = binary 100
 - octal 5 = binary 101
 - octal 6 = binary 110
 - octal 7 = binary 111
```

So we can denote read, write, and execute permissions with one octal digit. We use one octal digit to denote the three permissions of the owning user, another to denote the permissions of the owning group, and another to denote the permissions of everyone else:

```go
permissions := 0714   // (octal constants denoted by leading 0)
                      // 7 = 111, so owning user can read, write, and execute
                      // 1 = 001, so owning group can just execute
                      // 4 = 100, so non-users can just read
```

## opening files

The `os.File` struct represents an open file. All of `os.File`'s fields are private because we are meant to interact with it using only its methods.

Internally, `os.File` stores a file descriptor, which we can retrieve with the `Fd` method (though we generally have no need to deal directly with file descriptors in Go).

Rather than create instances of `os.File` directly, we use `os.OpenFile`, which opens a new or existing file and returns a pointer to an instance of `os.File`. We pass a string path denoting the file to open, an integer denoting the mode (read-only, write-only, etc.), and another integer denoting the type of file and its permissions. Very confusingly, the first integer is just an `int`, but the second is a `os.FileMode`, which is defined as a `uint32`. Why define a custom type for one but not the other? Why is the integer denoting the file mode not a `FileMode` while the integer denoting everything *but* the file mode *is* a `FileMode`?! It's baffling.

Anyway, for both integers, the individual bits represent various modes, types, and permissions as bit flags. The `os` package defines eight bit flag constants for the eight modes:

 - `os.O_RDONLY`     (open the file read-only)
 - `os.O_WRONLY`     (open the file write-only)
 - `os.O_RDWR`       (open the file read-write)
 - `os.O_APPEND`     (append data to the file when writing)
 - `os.O_CREATE`     (create a new file if none exists)
 - `os.O_EXCL`       (used with O_CREATE, file must not exist)
 - `os.O_SYNC`       (open for synchronous I/O)
 - `os.O_TRUNC`      (if possible, truncate file when opened)

When opening a file, we specify the modes as a combination of these constants bitwise or'd together:

```go
mode := os.O_RDWR | os.O_APPEND | os.O_TRUNC      // an integer denoting these three modes
```

Not all combinations are valid, *e.g.* a file cannot be both read-only and write-only. (This is an area where the `os` package documentation does not give details. Consult the Linux documentation about these flags.)

For the second integer, we have twelve `os.FileMode` bit flag constants:

 - `ModeDir`         (d: is a directory)
 - `ModeAppend`      (a: append-only)
 - `ModeExclusive`   (l: exclusive use)
 - `ModeTemporary`   (T: temporary file)
 - `ModeSymlink`     (L: symbolic link)
 - `ModeDevice`      (D: device file)
 - `ModeNamedPipe`   (p: named pipe)
 - `ModeSocket`      (S: Unix domain socket)
 - `ModeSetuid`      (u: setuid)
 - `ModeSetgid`      (g: setgid)
 - `ModeCharDevice`  (c: Unix character device, when ModeDevice is set)
 - `ModeSticky`      (t: sticky)

Most of these denote special file types, so for opening most normal files, we won't use any of these flags.

The lowest nine bits of the second integer denote the nine Unix file permissions. We combine 'mode' and permissions by bitwise or'ing 'mode' constants and an octal number for the permissions:

```go
fileMode := os.ModeTemporary | 0777      // a temporary file with read, write, execute permissions for everyone
```

Most combinations of the `os.FileModes`s are invalid, *e.g.* a file cannot be both a directory and a socket, so `os.ModeDirectory | os.ModeSocket` is invalid.

The second integer argument only matters when opening a *new* file: if the file already exists, we can just pass `0`! If we don't use `os.O_CREATE`, `os.OpenFile` will return an error if the file does not already exist:

```go
f, err := os.OpenFile("/foo/ack", os.RDWR, 0)    // open file at path "/foo/ack" for reading and writing
if err != nil {
    // we get an error if a file at path "/foo/ack" did not already exist
}

// This time, the open will succeed and the file created if it doesn't exist already.
// Because this may create a new file, we should specify proper permissions.s
f, err = os.OpenFile("/foo/ack", os.RDWR | os.CREATE, 0777)   // everyone has full permissions for new file
if err != nil {
    // ...
}
```

As conveniences, we have `os.Open` as a simpler way to open an existing file for reading and `os.Create` as a simpler way to open a new file for reading and writing:

```go
f, err := os.Open("/foo/bar")       // os.OpenFile("/foo/bar", O_RDONLY, 0)
if err != nil {
    // ... problem opening the existing file
}

f2, err := os.Create("/foo/ack")    // os.OpenFile("/foo/ack", O_RDWR | O_CREATE | O_TRUNC, 0666)
if err != nil {
    // ... problem opening the new file
}
```

## reading and writing files

Once we have an `os.File` pointer returned by `os.OpenFile`, we can read and write the file (modes and permissions willing) using the `os.File` methods `Read`, `ReadAt`, `Seek`, `Truncate`, `Write`, `WriteAt`, `WriteString`. We'll look here just at `Read`, `Write`, and `Seek`.

### Read

The `Read` method takes a slice of bytes and returns the number of bytes read (plus an error). The bytes read are copied to the slice. The number of bytes read will be less than or equal to the length of the slice:

(In all these examples, assume an `os.File` pointer *f* opened for reading and writing.)

```go
b := make([]byte, 40)
n, err := f.Read(b)
if err != nil {
    // ... some error in reading the file
}
b2 := b[:n]    // get slice with just the read bytes
```

The `Read` method advances the file marker by the number of bytes read. When we read when the marker is at the end of file, `Read` will return 0 and `io.EOF` (a constant in the `io` package denoting End of File):

```go
b := make([]byte, 40)
n, err := f.Read(b)
if err != nil {
    // err will be io.EOF if the file marker was at the end of the file
}
```

Because `Read` doesn't necessarily read as many bytes as we request, we have to repeatedly read until we get all the bytes we want:

```go
// read 40 bytes (or fewer if the file does not have 40 bytes left from where we start reading)
b := make([]byte, 40)
bytesRead := 0
for bytesRead < 40 {
    n, err := f.Read(b[bytesRead:])
    if err != nil {
        if err == io.EOF {
            // got all the bytes there are to read
            b = b[:bytesRead]
            break;         
        }
        // ... some other error
    }
    bytesRead += n
}
```

### Write

The `Write` method takes a slice of bytes and returns the number of bytes written (plus an error). The bytes written are copied from the slice. The number of bytes written will be less than or equal to the length of the slice. The error will be `io.ErrShortWrite` if the number of bytes is less than the length. The `Write` method advances the file marker by the number of bytes written:

```go
// write 40 bytes
b := make([]byte, 40)
// ... populate the slice with interesting data
bytesWritten := 0
for bytesWritten < 40 {
    n, err := f.Write(b[bytesWritten:])
    if err != nil && err != io.ErrShortWrite {            
        // ... some error (other than not writing all 40 bytes)
    }
    bytesWritten += n
}
```

### Seek

The `Seek` method moves the file marker. The first argument specifies the offset; the second argument specifies the position from which the offset is relative. This second argument is one of three constants defined in the `io` package: 

 - `io.SeekStart` (relative from the start of the file)
 - `io.SeekCurrent` (relative from the current marker position)
 - `io.SeekEnd` (relative from the end of the file)

The `Seek` method returns the new marker position and an error.

```go
pos, err := f.Seek(35, io.SeekStart)     // seek to the 36th byte of the file (remember to import 'io')
if err != nil {
    // ... error moving file marker
}
```

## closing files

Once our process is done with a file, it should close the file with the `os.File` method `Close`:

```go
f, err := Open("somefile")
if err != nil {
    // ... file did not open successfully
}
// ... use the file
f.Close()              // we close the file once we no longer need it
```

Common practice in Go is to use a `defer` statement to close the file after opening it and checking for the error; this ensures the file will be closed once execution leaves the enclosing call:

```go
f, err := Open("somefile")
if err != nil {
    // if an error occurs, 'f' will be nil, so we should only defer Close once we know no error occured 
}
defer f.Close()         // ensure we close the file when the enclosing call returns
// ... use the file
```

Because `Close` returns an error value, the *really proper* way to defer a close is like so:

```
defer func() {
    err := f.Close()
    if err != nil {
        // ... file didn't close properly
    }
}()
```

(It's not always clear what we can do when closing a file fails, but this is how we would at least detect the problem.)

## creating, reading, and modifying directories

If the open file is a directory (remember that a directory is technically just a special kind of file), we can read its contents with the `os.File` methods `Readdir` and `Readdirnames`. To create new directories, we use the functions `os.Mkdir` and `os.MkdirAll` ('mk' is short for 'make'). To modify the contents of a directory, we create new files and use the functions `os.Link`, `os.Rename`, `os.Remove`, and `os.Removeall`.

## deleting files and directories

To delete a file or directory, we simply remove it from all directories where it is listed. The filesystem will reuse the storage space occupied by a file once it is no longer listed in any directory of the partition.
