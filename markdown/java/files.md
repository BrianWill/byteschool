# Java reading and writing files

## `java.io.File`



## `java.io.RandomAccessFile`




## `java.nio.FileChannel`

## `java.nio.ByteBuffer`

because it's abstract, create instances with static method to create because we can't directly new an abstract class (in the static method, it instantiates some subtype of ByteBuffer)

## `java.io.FileDescriptor`

Represents a file descriptor (an integer internal to the process representing an open file).

## `java.io.FileInputStream`

The `java.io.InputStream` abstract class represents the general idea of a source of data from which we can read bytes, such as a file or network connection. A `java.io.FileInputStream` represents an input stream reading bytes from an open file.

3 constructors: File, string (path), or FileDescriptor

To create a `FileInputStream` from an already open file, pass the constructor the open file's `FileDescriptor`.

## `java.io.FileOutputStream`

The `java.io.OutputStream` abstract class represents the general idea of a something to which we can write bytes, such as a file or network connection. A `java.io.FileOutputStream` represents an input stream reading bytes from a file.


.read

.

Imagine a method where you wanted to read bytes but didn't care what kind of source: sometimes it might be a file, sometimes it might be a data connection, etc. In that case, the method would receive an InputStream rather than any specific kind of InputStream.







## java.io.Reader

A Reader reads characters from a data source.

FileReader is a convenience type that wraps InputStreamReader, FileInputStream, and File)


## java.io.Writer


## java.io.BufferedReader





## java.nio (new I/O)

## java.nio.file.Files

convenience static methods that operate on files
many conveniences for common file operations: copying files, deleting files

## java.nio.Path