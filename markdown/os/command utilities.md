# command-line utilities

Unix systems come stock with many standard utility programs in the standard directories `/bin` ('binaries') and `/sbin` ('superuser binaries'). By default, both of these directories are listed in the `PATH`, so you can run them by name.

### the `ls` ('list') program

The `ls` program displays the contents of a directory:

```
ls /foo/bar                        # lists the contents of directory /foo/bar
```

By convention, program arguments with a single letter after a hyphen are 'flags', which denote options. For `ls`, the flag ‘l’ means to print each entry on a single line, and the flag ‘a’ means to print entries beginning with a period (by convention, many Unix programs, including `ls`, will by default not list files and directories whose names start with a period).

```
ls -l -a /foo/bar
```

In many cases, we can combine flag letters as a convenience:

```
ls -la /foo/bar                    # same as previous
```

Again, what the arguments to a program mean are particular to that program! Most programs follow certain conventions, such as using hyphen to designate flags, but Unix and the shell impose no rules.

If we omit a path, `ls` will print the current working directory (which, recall, it inherits from the shell):

```
cd /foo
ls                                 # prints contents of /foo 
```

### the `man` ('manual') program

The `man` program displays documentation for the standard utility programs. For example:

```
man ls                             # display the manual page for the ls program
```

Unlike many other terminal programs, `man` does not immediately terminate. Instead, the user can navigate up and down through the text using arrow keys and page up/down. To terminate `man`, the user presses 'q'.

(Be clear on the difference between `help` and `man`: `help` is a built-in shell command that displays info about the built-in shell commands; `man` is a program that displays info on other standard utility programs.)

### the `less` program

The `less` program displays the content of a text file:

```
less /foo/mydoc                    # displays file /foo/mydoc
```

(The name `less` is a joke. The predecessor of `less` was called `more`. Get it? Less is more.)

Like `man`, the `less` program lets you scroll up and down through the file. To exit `less`, press ‘q’.

### the `cp` ('copy') program

The `cp` program copies a file:

```
cp /apple/orange /banana           # copies /apple/orange to /banana
```

### the `mv` ('move') program

The `mv` program moves a file:

```
mv /apple/orange /banana           # moves /apple/orange to /banana
```

Perhaps surprisingly, the `mv` program is also what we use to rename a file but keep it in the same directory:

```
mv /apple/orange /apple/mango      # rename file orange in /apple to mango
```

### the `rm` ('remove') program

The `rm` program removes files:

```
rm /apple/orange                   # remove /apple/orange 
```

To delete a directory and all of its contents, we use the -r flag ('r' short for 'recursive'):

```
rm -r /apple/orange                # delete the directory and everything under it
```