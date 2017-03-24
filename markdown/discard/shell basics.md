What’s called ‘the shell’ is a program that reads and executes user-typed commands. In a later unit, we’ll discuss the precise nature of the shell and how it relates to what are called ‘terminals’. For now we’ll just look at the most essential commands.

shells

A shell is a program that presents the user with a command prompt. The user types a command, hits enter, and the shell executes the command. A shell language is effectively a programming language, but unlike general-purpose languages, a shell language is designed primarily for running and managing other programs.

There are many different shells in use, each with its own syntax and semantics. What is commonly referred to as ‘the Unix shell’ is properly called the Bourne Shell (named after its creator Stephen Bourne). The shell most commonly used today (and used by default on most Linux systems and OS X) is called bash (the Bourne Again Shell), which is just like the Bourne Shell but with extra features added. Bash is the shell we will learn to use.

As we’ll discuss in a later unit in detail, a shell reads text input from and prints text output to a device called a terminal. On computers in earlier decades, terminals were actual hardware devices with text display screens and keyboards. Today, we use terminal emulators, programs which simulate these old devices in a window. OS X and most Linux systems come stock with a terminal program that will automatically start and interface with a bash shell. Just look for a program called ‘terminal’.


The nature of files, directories, and the command-line shell are discussed in detail in the next unit. In the meantime, here’s the bare minimum you need to know to compile and run Go programs:

Shell commands follow this basic format (I will use dollar sign to denote the start of the command prompt):

    $ name arguments

...where name is the command to execute and arguments are zero or more space-separated pieces of text. For example:

    $ foo bar ack

…is the command named foo with arguments bar and ack. Just like with arguments to a function, the meaning of the arguments to a command are particular to that command.

A running shell has a ‘current working directory’. Many commands use the current working directory as a default location. For example, the ls command lists the contents of a directory specified as argument:

    $ ls /foo           

This lists the content of directory /foo. However, if you don’t specify any directory…

    $ ls

...ls prints the contents of the shell’s current working directory. (On Windows, dir is used to list directory contents rather than ls).

Your shell may or may not display the current working directory before the command prompt, like so:

    /home/brian$

The cd command changes the shell’s current working directory:

    /home/brian$ cd /home
    /home$


For commands expecting a file or directory path, we can generally specify absolute paths or relative paths. An absolute path on Unix begins with / and on Windows begins with a drive letter:

    /home/brian                     # my Linux home directory
    C:\Users\brian                 # my Windows user directory

(Note that Windows uses backslashes instead of slashes.)

A relative path does not begin with / on Unix or a drive letter on Windows. Relative paths are relative from the current working directory, e.g. given /home/brian is my current working directory, the relative path apple/banana refers to /home/brian/apple/banana. For example:

    /home/brian$ cd foo/bar
    /home/brian/foo/bar$

Every directory has a special entry .. which refers to the containing directory. By using .. as a relative path we can easily move up the directory hierarchy:

    /home/brian/foo/bar$ cd ..
    /home/brian/foo$ cd ../..
    /home$ cd ..
    /$








Bash has about 70 built-in commands. The help command will list all the commands:

    $ help                # list the built-in commands

(I will use $ to denote a bash prompt. A # character and everything after it on the line is ignored by the shell.)

Most commands can be given arguments. For example, we can also use help to get detailed descriptions of any built-in command:

    $ help cd      # get description of the cd command


Aside from executing built-in commands, we can also run executable files by writing their paths:

    $ /foo/bar           # run the executable file bar found in /foo

Like all processes, the shell process has a current working directory (a.k.a. the pwd, process working directory). Bash is typically configured to display the current working directory in the prompt:

    /foo/bar$                         # the current working directory is /foo/bar

We can run binary executables by specifying paths relative from the shell’s current working directory:
    
    /foo/bar$ apple/orange     # run executable /foo/bar/apple/orange

The relative path must always contain a slash. If you wish to run a binary executable in the current working directory, you must use this trick:

    /foo/bar$ ./orange             # run executable /foo/bar/orange

What’s going on here is that every Unix directory always has a special entry . which resolves to the directory itself. So the path /foo/bar/. is the same as /foo/bar, and  /foo/bar/./orange is the same as /foo/bar/orange

You’ll also sometimes use .. in paths. The double dots specially resolve to the containing directory, e.g. /foo/bar/.. is the same as /foo, and /foo/bar/../orange is the same as /foo/orange 


By default, the shell waits for a program we run to finish before presenting the prompt again. As we’ll see later, though, we can choose to run programs in the background such that we can continue using the shell without waiting.


The built-in command cd changes the current working directory of the shell:

    /foo/bar$ cd apple
    /foo/bar/apple$ cd ..
    /foo/bar$ cd /ack
    /ack$



Like every other process, the shell has an environment. The environment variable PATH has a list of directory paths (separated by colons). For example, on my system, the PATH currently has this value:

    /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

When I run a command that is not the name of a built-in and contains no slashes, the shell will search for a file in these PATH directories, working left-to-right. If found, the shell will execute the file.

The directories in a typical PATH should contain the so-called standard ‘Unix utilities’, which are programs for performing common tasks, like copying and deleting files.


    






user accounts
permissions

home directories


chown
chmod

http://cli.learncodethehardway.org/bash_cheat_sheet.pdf

touch

rmdir
mkdir

ps
top



using the go tools


