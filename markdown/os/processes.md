# processes

> *The following specifically describes Linux, but most of this applies to other Unixes, and much of it applies to Windows.*

Each process has:

 - a pid (process id)
 - memory tables
 - a few user ids
 - an environment
 - a current directory and a root directory
 - zero or more file descriptors 

A *pid* is simply an integer that uniquely identifies the process. (When a process ends, its pid may get reused for a subsequently created process.)

## memory tables

The memory tables, as we've discussed, map pages of virtual addresses to pages of physical addresses. When a process starts, some pages are automatically mapped for storing the processes's code and a call stack. All virtual addresses outside of these pages start out unmapped, and so using them in instructions will trigger hardware exceptions.

In Linux, the *mmap* ('memory map') system call maps pages. When invoking *mmap*, we specify how many bytes we want (though be clear pages are always allocated as whole pages: if, say, we request just 1 byte, we'll still get a full page). When *mmap* returns, it returns the starting address of the newly allocated page(s). Optionally, we can specify which starting address we want, but otherwise the OS will choose for us.

Remember that system calls are always really just *requests*: for various reasons, the OS may not want---or may not be able---to fill our request, so it will return a value indicating an *error*. Immediately after each system call, our code should always check for an error, and in the event of an error, our code will have to decide how to cope, whether by trying again, trying something else, or aborting.

The *munmap* ('memory unmap') system call unmaps pages. We pass munmap an address and a number of bytes, and it unmaps all pages overlapping that range of addresses.

## user ids

A Unix system has a list of user accounts, each associated with an integer id. Different users have different permissions, *e.g.* not all users have permission to read and write all files. The special *root user* (*a.k.a.* *superuser* *a.k.a.* *admin*) has permission to do anything it wants.

Each process has three user ids:

 - the “effective” id
 - the “real” id
 - the "saved" id

The "effective" id determines the permissions of a process: a system call returns an error when the "effective" user doesn't have permission for the call.

The "real" id denotes which user launched the process.

When a process starts, the "saved" id is always the same as the "effective" id. The *seteuid* ('set effective user id') system call modifies the "effective" id but first copies the "effective" id to the "saved" id. We wouldn't want a process to arbitrarily change its own permissions, so a process without root permissions can only set its "effective" id to the value of its "real" or "saved" ids.

## environment variables

Each running program has a (generally small) set of configuration data called its environment variables. Each variable is expressed in ASCII text in the form name=value. For example, a program might have this set of variables:

```
FOO=3
BAR=/some/file/path
ACK=More stuff.
```

A variable name, by convention, is all uppercase and does not include spaces. A value, on the other hand, may be any sequence of characters. The end of each value is denoted by a byte that is all zero bits.

[how to access/modify?]

## fork

The *fork* system call creates a new process. The process calling *fork* is the parent, and the new process is its *child*. Before the parent and child continue execution...

 1. the parent's user ids, environment, file descriptors, current directory, and root directory are copied to the child
 2. every virtual page in the parent's memory table is marked as *copy-on-write*
 3. execution in both processes resumes immediately after the *fork* system call; in the parent, *fork* returns the value 0; in the child, *fork* returns the child's pid (which is different from the parent's pid)

Basically, by calling *fork*, a process makes an independently executing clone of itself. 

The parent and child share the same memory tables, and all the pages are marked as *copy-on-write*. When either process writes to a *copy-on-write* page, an exception is thrown. In the exception handler, the OS copies the physical page and gives both processes their own separate mappings, removing the *copy-on-write* mark; the OS then jumps execution back to where the exception was thrown. So as soon as the parent or child try writing to a shared page, its given its own separate copy and mapping so that changes in one process do not affect the other.

Without *copy-on-write*, *fork* would have to copy all of the parent's physical pages and create a whole new memory table for the child before returning. Not only would this make *fork* slow, it would often just be wasteful: commonly, many pages of the parent and child remain unmodified for the rest of their lifetimes; as long as neither process modifies the page, they can keep sharing the page.

## *exec* system calls

The *exec* system call wipes the process's memory tables and loads new code from an executable file. In effect, to start and run a new program, a process forks itself and then in the child clone calls exec.

If the exec'd file has its "setuid" bit flipped on, the "effective" and "saved" id are set to match the owner of the file. By forking and execing such a file, a process can launch another process with different permissions than its own.

When calling exec, we can pass a list of strings called the "program arguments". A process can access the program args that were passed to it using [what sys call? designated address?]  . The significance of the arguments is entirely up to the interpretation of the receiving process. Typically, program arguments are used to specify options about how the program should run or what it should do.

Aside from the new memory tables and program arguments, the newly exec'd process retains everything else: the environment, the file descriptors, *etc.*

## *exit* and *wait* system calls

When a process exits, it specifies an *exit code*, an integer number indicating whether the process completed successfully (and if not, what went wrong). By convention, a process returns zero to indicate successful completion and non-zero values to indicate errors. What the error values mean is particular to each program.

A parent process calls *wait* to block until a child process exits. Once the child exits, the parent unblocks and *wait* returns the child's exit code.

A terminated process becomes a zombie until its parent calls *wait* on it. Zombie processes won't get scheduled, but the OS's internal representation of the process persists, taking up memory. A few forgotten zombie processes won't hurt much, but it's good practice to not leave zombie children hanging around.

## init, login, and shell processes

When the OS loads, it creates one process called *init*. The root-privilege init process does some startup business and then forks and execs a *login* process, which prompts the user to enter their user account name and password. When the login process verifies the user has entered valid credentials, it forks and execs a *shell* running under the user's id. (Using the *setuid* system call, a root-privilege process can change its user ids to anything it wants.) The shell may present a textual, command-line driven interface, or it may present a graphical, mouse-driven interface. When the human user commands the shell to run a program, the shell forks itself and execs the program.

## the process hierarchy

Effectively, the running processes form a hierarchy: init spawns login which spawns a shell for every logged in user, and each shell may spawn other processes which in turn may spawn other processes.




terminating the parent terminates its children...except in some cases
[sends them kill signal? something like that]


## user groups



## signals

signals


## process groups, sessions, and job control [put this under terminals? need signals first]





