# the file system

Each storage device is logically split into one or more partitions, and each partition contains some number of files and directories.

A ***file*** is a sequence of stored bytes. The bytes are not necessarily stored contiguously and in order, but that is the concern of the file system. As far as a process sees, a file is a logical sequence of *n* bytes.

A ***directory*** (a.k.a. *folder*) is a list of files and/or other directories.

Each partition has at least one directory, a special directory called the partition’s ***root directory***.

## Windows file paths

On Windows, each partition on a system is known by a unique letter, *e.g.* `C:`, `D:`, `E:`

A ***file path*** is a string of text denoting a file or directory by its location. On Windows, the root directory of partition `X:` is known by the path `X:\`

The path `X:\foo\bar` refers to a file or directory named *bar* listed in the directory *foo*, itself listed in the root directory of partition `X:`

An ***absolute path*** begins with a drive letter, *e.g.* `c:\foo\bar`. A ***relative path*** resolves to a file or directory relative to some other directory. For example, the relative path `apple/orange` resolved relative to `c:\foo\bar` is equivalent to the absolute path `c:\foo\bar\apple\orange` 

(Using \ to separate the components of a path is preferred on Windows, but / is generally valid as well.)

Every directory has a special entry `.` which refers to the directory. For example, `c:\foo\.\bar` is effectively the same as `c:\foo\bar`

Every directory also has a special entry `..` which refers to the containing directory. For example, `c:\foo\bar\..\ack` is effectively the same as `c:\foo\ack`

## Unix file paths

On Unix systems, such as Linux and OS X, file paths are different in three ways:

First, only / is allowed, never \\. 

Second, whereas Windows generally does not care about letter case in file and directory names, Unix systems do care, *e.g.* *foo*, *FOO*, *Foo*, *FoO*, *etc.* are all different names in Unix.

Third, Unix partitions are not given drive letters. Instead, one partition is mounted to the path `/` such that `/` then refers to the root directory of that partition. This is the 'system root directory' (often just called ‘the root’). The partition mounted at `/` is sometimes called the 'root partition’.

Other partitions may then be mounted to other directory paths. For example, having mounted a partition to `/`, we can create a directory on that partition with path `/foo/bar` and then mount another partition to that directory. The path `/foo/bar` will subsequently resolve not to a directory on the first partition but instead the root directory of the second partition. Effectively, all paths beginning with `/foo/bar` will resolve to files or directories on the second partition.

(Be clear that, with the exception of the root partition, partitions can only be mounted to directories which already exist on already mounted partitions. We don’t usually have to concern ourselves with this, though, because the partitions of a system’s storage drives are generally mounted automatically on system startup.)

## file ownership

Each file and directory belongs to one user account and one user group. When a process creates a file or directory, it belongs to the effective user and effective group of the process. With appropriate permissions, we can use the `chown` system call to change which user and group own a file.

Each file is marked with permission bits denoting who has permission to read, write, or execute the file. These three permissions are marked separately for the owning user, the owning group, and everyone else, so we have nine permissions bits total. (If the permissions 'conflict', the most permissive takes precedence: for example, if the owning user does not have permission to read the file but everyone else does, then the user can read the file.)

Each directory is also marked with these nine permission bits, but what exactly does it mean to read, write, or execute a directory? Read permission lets us get a listing of the directory's contents. Write permission lets us add/remove/modify that listing. Execute permission lets us traverse the directory, *i.e.* use the directory in file paths we pass to system calls. For example, if we don't have execute permission on `bar` in `/foo/bar/ack`, we'll get a permission denied' error if we pass file path `/foo/bar/ack` to a system call.

## directories and inodes

Each file has an *inode* stored on disk. A file's inode describes the file and points to where its content is stored in the partition. Each inode is known by an integer number that is unique within its partition.

Directories and special files also have inodes.

A directory is a list of entries, each containing a name, a type (file, directory, or special file), and an inode number.

The names within a directory must be unique, but multiple entries in a single directory---or across separate directories---may have the same inode. In other words, the same file or directory can be known by different names within a directory and can be listed in multiple, separate directories.

## Unix special files

A 'regular file' is a sequence of some number of bytes stored on some kind of storage device. A 'special file' represents...something else. We use mostly the same set of system calls to read and write both regular and special files. A 'file', in this general sense, is just something we read and write with a common set of system calls.

The kinds of special files include:

 - directories
 - symbolic links
 - character device files
 - block device files
 - sockets
 - pipes
 - memory-mapped files

## character device files

A ***character device file*** represents an I/O device to which we can send data by writing to the file and from which we can receive data by reading from the file. Data is strictly sent and received as a sequence of bytes: data goes out and comes in, byte-by-byte.

Most commonly, we communicate with character device files by sending and receiving ASCII text (hence the name).

Character device files usually represent simple I/O devices, like some older printers, for example: we can print to such printers by opening and writing text data to their associated character device files.

Though device file are OS abstractions---and so they do not necessarily represent any data stored on disk---they can be represented as inodes and listed in directories. By convention, Unix systems list the inodes of device files under the `/dev` directory ('dev' as in 'device'). The set of device files under `/dev` varies from system to system.

## block device files

A ***block device file*** also represents an I/O device, but like a regular file, the data we read and write from a block device logically has a beginning and an end. Unlike with a character deivce file, when we read or write a block device, we specify 'where' to read or write.

## pseudo-devices

A *pseudo-device* file is a character or block device file that doesn't represent any actual I/O device. For example, most Unix systems have `/dev/zero`, a character pseudo device file that simply discards any data we write to it and from which we can read an infinite sequence of zero bytes.

## symbolic links

A symbolic link is a special file that simply contains a file path. For most system calls, a file path resolving to a symbolic link will in turn resolve to the contained path. For example, if the path `/foo/bar` resolves to a symbolic link containing the path `/alice/bob/carol`, passing the path `/foo/bar` to many system calls is the same as passing `/alice/bob/carol`. (Sometimes we don't want this behavior, so several system calls have variants that do not follow symbolic links.)

## sockets

A socket represents a network connection. Reading a socket reads the data received over the network; writing to a socket sends data over the network. We'll discuss network programming in later lessons.

## pipes

A pipe represents a logical queue of bytes in memory: when bytes are written to a pipe, the bytes can then be read from the pipe in the same order they were written. Multiple processes can all read and write from the same pipe, thus pipes are useful for communicating between processes.

## memory-mapped files

A regular file can be opened as a memory-mapped file. The bytes of the file are mapped to virtual pages of our process such that we can read and write the file by reading and writing these addresses. In essence, we can read and write a memory-mapped file as if it were just bytes in memory, and the OS will automatically write the changes we make to disk. In some cases, memory-mapping files is more convenient and efficient than the regular way of reading and writing files.