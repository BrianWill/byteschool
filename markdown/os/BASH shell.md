A ***command-line shell*** is a program that reads and executes user-typed commands.

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









Bash has about 70 built-in commands. The help command will list all the commands:

    $ help                # list the built-in commands

(I will use $ to denote a bash prompt. A # character and everything after it on the line is ignored by the shell.)

Most commands can be given arguments. For example, we can also use help to get detailed descriptions of any built-in command:

    $ help cd     # get description of the cd command


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



The utility ls (short for list) displays the contents of a directory:

    $ ls /foo/bar        # lists the contents of directory /foo/bar

Remember that a process may be passed string arguments in the exec system call from its parent process. Above, when the shell process spawns the ls process, it passes the string “/foo/bar”, which ls interprets as a directory whose contents it should list.

String arguments to programs often specify options. For example:

    $ ls -la /foo/bar

Here, the ls process receives both “-la” and “/foo/bar” as arguments. The ls program interprets arguments beginning with a hyphen as ‘flags’ specifying options. For ls, the flag ‘l’ means to print each entry on a single line, and the flag ‘a’ means to print entries beginning with a period (by convention, many Unix programs, including ls, will by default not list files and directories whose names start with a period.)

Again, what the arguments to a program mean are particular to that program. Most programs follow certain conventions, such as using hyphen to designate options, but Unix and the shell impose no rules.

When the shell spawns a process, the new process will inherit the same current working directory. For some programs, this may have significance. The ls program will list the contents of the current working directory if we do not pass it any directory paths:

/foo$ ls            # prints contents of /foo 




The utility man (short for manual) displays documentation for the standard utility programs. For example:

    $ man ls            # display the manual page for the ls program

The man program will take over the terminal from the shell. If the man page length exceeds the height of the terminal window, you can scroll up and down using the arrow keys or pageUp/pageDown. To exit the man program and get back to the shell, hit ‘q’.

(Be clear on the difference between help and man: help displays info on the shell’s built-in commands; man displays info on standard utility programs.)



The less program displays the content of a text file:

    $ less /foo/mydoc         # displays fie /foo/mydoc

 (The less program is an improved successor to an older program called more. Get it? Less is more.) The less program lets you scroll up and down through the file. To get back to the shell, hit ‘q’.



The cp program (short for copy) copies a file:

    $ cp /apple/orange /banana       # copies /apple/orange to /banana



The mv program (short for move) moves a file:

    $ mv /apple/orange /banana       # moves /apple/orange to /banana

Perhaps surprisingly, the mv program is also what we use to rename a file but keep it in the directory:

$ mv /apple/orange /apple/mango      # rename file orange in /apple to mango



The rm program (short for remove) removes files:

$ rm /apple/orange      # remove /apple/orange 

To delete a directory and all of its contents, we use the -r flag:

    $ rm -r /apple/orange













home directories


chown
chmod

http://cli.learncodethehardway.org/bash_cheat_sheet.pdf

touch

rmdir
mkdir


using the go tools


