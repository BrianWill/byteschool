
# Linux system calls for files and directories

Each process has a current working directory. When a process passes relative paths to certain system calls, the paths are resolved relative to the current working directory. For example, if a program has the current working directory `/harry/ted` and passes relative path `alice/bob` to the system call for opening files, the call opens the file `/harry/ted/alice/bob`.

The Linux system calls are primarily meant to be called from code written in the *C* language, but because we haven't yet covered C, we'll describe the essential file-related system calls in general terms:

### open

The *open* system call prepares a file for access and returns a ***file descriptor***, an integer number used in subsequent system calls to specify the open file. Descriptors are unique within the process.

A descriptor is actually just a number representing an underlying ***file description***. Each file description maintains a *marker* that determines where we read and write in the file.

### dup

The *dup* system call (short for 'duplicate') takes a file descriptor as input and returns a new file descriptor representing the same underlying file description.

### close

Passing a file descriptor to the *close* system call reclaims the file descriptor. Once we reclaim all file descriptors representing an underlying file description, the file description is reclaimed, effectively 'closing' the open file.

In general, we should avoid leaving around open files we no longer need because doing so wastes memory. Once a process terminates, its open file descriptors get closed automatically, but in long-running processes, we may use many files over its lifetime, and so we should get in the habit of closing files explicitly.

### lseek

The *lseek* system call sets the position of a file description's marker. We pass in a file descriptor and a position.

What does 'l' in 'lseek' stand for? Possibly 'long', but no one seems to know for sure. The meaning is lost to history!

### read

The *read* system call copies some number of bytes from a file into memory of the process. We pass in a file descriptor, an address, and a number of bytes. Data from the file specified by the descriptor is copied to the address. The call returns the number of bytes copied, which will be no greater than the number we passed as argument.

A *read* call reads bytes starting from a position in the file denoted by the file description's marker. The marker is advanced by the number of bytes read, *e.g.* if *read* returns 10, the marker advances 10 bytes.

Why doesn't *read* just copy however many bytes we requested? Well, sometimes it might, but sometimes it won't, for three reasons:

 - The file may have fewer bytes left to read than we requested. We can't read past the end of file!
 - Reading data off disk is slow (in computer terms). Rather than make your process wait a (relatively) long time, the operating system may return fewer bytes than requested---or even zero bytes!
 - As discussed shortly, some special kinds of files we might read aren't actually bytes stored on disk! For some of these special files, we can't know how many bytes they have before reading them.

It is the responsibility of the process to keep calling *read* until it has all the bytes it wants.

### write

The *write* system call is just like *read*, but the data is copied in the other direction, from the process's memory to the file. Like with *read*, the number of bytes actually copied may be fewer than we request.

If we write to positions past the current end of the file, the file will grow to accomodate the new bytes.

### mkdir

The *mkdir* system call 'makes a directory', given a path for the new directory.

### rmdir

The *rmdir* system call 'removes a directory', given a path to the directory. If the directory is not empty, the call returns an error.

### getdents

The *getdents* system call 'gets directory entries', given a file descriptor of an open directory (yes, we can use *open* on directories).

### link

The *link* system call creates a new directory entry that references an inode of an already existing entry (which may or may not be in the same directory). The caller specifies two paths: a path to an existing entry, and a path for the new entry.

### unlink

The *unlink* system call removes a directory entry. Only once all entries referencing an inode are removed does the file it references get deleted from the partition.

### stat

The *stat* system call returns a file's 'status', which includes the file's size, last access date, and other details.

### mount

The *mount* system call mounts a partition to an existing directory on another partition. After mounting, paths to that directory actually resolve to the root directory of the mounted partition. For example, if we mount a partition to `/foo/bar`, then `/foo/bar/ack` resolves to `ack` inside the root directory of that partition.

### unmount

The *unmount* system call unmounts a partition. After, the mount point (the directory on which the partition was mounted) can be accessed like a normal directory again.

### chdir

The *chdir* system call changes the working directory of the process. When we pass a relative path to a system call, it is resolved relative from the workign directory.

### symlink

The *symlink* system call creates a symbolic link. The caller specifies two paths: a path for the new symbolic link, and a path for the symbolic link to contain.

## read and write buffers

The storage of a partition is divided into chunks called ***blocks***. The size of a block depends on the partition, but typical sizes include 512 bytes, 4kB, 8kB, 16kB, and 32kB. 

 - When a file is opened, for each block we read or write, a *buffer* (a chunk of memory) is allocated in the OS's memory.
 - When we read a file, bytes are copied from the partition blocks to OS buffers, and then bytes are copied from the buffers to our process. 
 - Likewise, when we write a file, bytes are copied from our process to OS buffers, and then bytes are copied from the buffers to the partition blocks.

When the OS copies data between a partition and buffers, it always copies whole blocks:

 - When reading a portion of a block, the whole block is copied into the buffer.
 - When writing to an existing block, the block is copied into a buffer first, and then the write modifies the buffer.

When a write modifies a buffer, the OS will copy the buffer back to the partition at some point, but no guarantee is made about when. In most cases, a *write* system call returns before the data actually makes it to disk. (Actually verifying that data really makes it to disk is surprisingly tricky and involves other system calls we haven't yet discussed.)

Though using read/write buffers requires copying data twice, in many cases, the extra step actually works out better for performance. For example, when reading from a file, it is very common to read the subsequent bytes very soon thereafter. By copying whole blocks to buffers, the OS often gets ahead of the process, such that subsequent reads needn't wait for disk access because the data is already sitting in an OS buffer. (Recall that storage devices are very slow relative to system memory and the CPU, so any time we can read data from memory instead of waiting on disk is a big win.)

## overlapping reads and writes

When a file is opened multiple times simultaneously (either from within the same process or across processes), all open file descriptions share the same set of buffers. So when I write to a file through one file descriptor, I am affecting the buffer read *via* any of the file descriptors.

When multiple threads or processes make overlapping reads and writes of a file, Linux makes virtually no guarantees about the ordering. For example, if two processes make overlapping writes to the same file, what the file looks like after both complete doesn't necessarily depend on which *write* call started or finished first. In short, the only way to ensure that overlapping access of a file doesn't result in garbled data is to coordinate access to the file, and the only way to guarantee that other process's can't mess with a file while your process uses it is to restrict access to the file through its permissions.
