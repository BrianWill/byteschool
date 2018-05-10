# terminals and shells

## terminals

Before the 1980's, nearly all human user interactions with a computer were through a ***terminal***. A terminal in the 1960's consisted of a keyboard and a printer. A terminal in the 70's typically had a video display instead of a printer, but these video displays could only display text characters, not graphics. Whatever the nature of the display, the computer read a stream of text input from the terminal's keyboard and wrote a stream of text output for the terminal to display.

In Unix, the OS handles the particulars of talking to a terminal: our program code just needs to read and write a character device file representing the terminal. Writing to a terminal's character device file displays text on the terminal's display; reading from a terminal's character device file reads input from the terminal's keyboard.

The terminal character device files are usually found in the `/dev` directory and have names starting with `tty` (short for 'teletype', a generic term for an electronic printer that is sent data to print over long distances).

Of course, today's computers have pointer-driven input and graphical displays rather than hardware terminals. Because many programs we use today still have terminal-based interfaces, we need ***terminal emulator*** programs. A terminal emulator displays a graphical window and gets keyboard/mouse input like other modern programs\*, but the emulator is associated with a character device file: other programs can read this file to get keyboard input typed in the window, and programs can write to this file to display text in the window.

> \* *We'll cover how to write windowed applications on modern platforms in later lessons. For now just understand that it's much more involved than just reading/writing a single character device file.*

## shells

A ***shell*** is a program that reads user commands from a terminal and executes those commands. Through a shell, the user can launch other programs and control the system.

There are many shells with different rules of syntax and semantics, each a sort of programming language unto itself. The default shell on the original Unix was called `sh` *a.k.a.* the 'Bourne shell' (after its creator, Stephen Bourne). The most commonly used shell today is a variant of `sh` called `bash` (short for the 'Bourne Again Shell'). (We cover `bash` in full in later lessons.)

In most shells, we can run a program and pass it arguments by simply writing the program name followed by zero or more arguments (separated by spaces) and hitting enter:

```
foo arg1 arg2 arg3
```

The above searches for an executable file *foo* in the directories listed in the `PATH` environment variable of the shell. When the specified executable file is found, the shell forks itself and, in the child, execs the file with three arguments: `"arg1"`, `"arg2"`, and `"arg3"`. The parent shell process waits for the child (unless we run the child as a 'background' process, discussed later). If the executable file is not found in any of the `PATH` directories, the shell displays an error message.

Arguments with spaces in them must be enclosed in double quotes:

```
foo "bla bla" arg2
```

Above, the first argument is `"bla bla"`, and the second is `"arg2"`.

We can also run a program by specifying its absolute path:

```
# run 'bar' in directory 'brian' in directory 'home' in the system root directory, passing two arguments
/home/brian/bar arg1 arg2
```

(A '`#`'' character and everything after it in on the line are ignored by the shell.)

Like any other process, the shell has a current working directory. The shell is usually configured to display the current working directory in the prompt, but this is not always the case. We can run programs by specifying a path relative from the current working directory:

```
# run 'bar' in directory 'brian' in the current working directory
brian/bar arg1 arg2
```

If we want to run a file in the current working directory, we have to trick the shell:

```
# run 'bar' in a directory of the PATH
bar arg1 arg2

# run 'bar' in the current working directory
./bar arg1 arg2
```

Above, `bar` is a valid relative path, but the shell only looks for it in the `PATH` directories. By using `.` to refer to the current working directory, we can form a path to *bar* that the shell will interpret as relative from the current working directory.

## echo mode and backspace

Typed input to a terminal isn't necessarily displayed on the terminal: input and output of a terminal are separate! However, terminals can run in *echo mode*, in which any typed input is automatically displayed on screen. While shells almost always leave echo mode on, some terminal programs will turn it off.

You might also notice that you can erase characters with backspace. Terminals conforming to the VT100 standard (most terminal emulators) interpret the ASCII `backspace` control character to mean just 'move the cursor back one position'. Hitting the backspace key actually generates three characters, ASCII `backspace`, then `space`, then `backspace` again: back up, overwrite with a space, then back up again. The shell will echo these characters, so hitting backspace effectively erases the last typed character and moves the cursor back one position.

## standard input, standard output, and standard error

For reading and writing the terminal, the shell itself keeps three open file descriptors: 0 (standard input), 1 (standard output), and 2 (standard error). All of these are open on the same pseudo-terminal character device file representing the terminal emulator, but 0 is open only for reading while 1 and 2 are open only for writing. When the shell forks itself to run a program, like with any other fork, the child process inherits copies of the open file descriptors. So by convention, programs launched from the shell expect to be able to read and write the terminal using these inherited descriptors.

It's sometimes useful to substitute what open file(s) a program inherits as standard input, output, or error. For example, we might want a program to write to a file on disk rather than write to the terminal. To arrange this, before execing, the shell's forked child process can close file descriptor 1 and open a different file for writing on file descriptor 1; when the execed program writes to standard output, it would effectively write to this new file rather than the shell's terminal.

To run a program but *redirect* standard output to a file as just described, follow the program arguments with the special character `>` followed by a file path (either absolute or relative). If no file already exists at the specified path, the shell will create it:

```
# run 'foo' with two arguments, redirecting standard output to file 'bar' in the current working directory
foo arg1 arg2 > bar
```

To redirect standard input, use `<`:

```
# when 'foo' reads from standard input, it will read from file 'bar' in the current working directory rather than the terminal
foo arg1 arg2 < bar
```

To redirect standard error, use `2>`:

```
# redirect standard error to 'bar'
foo arg1 arg2 2> bar
```

By convention, a program should write its normal output to standard output and write error messages to standard error. Doing so enables users to redirect normal output and error messages independently.

## built-in commands

In addition to running executable files, a shell has several dozen built-in commands. Here are a few example built-in commands:

### the `cd` built-in

The `cd` command sets the current working directory of the shell to the specified path (either absolute or relative):

```
# set the current working directory to '/foo/bar'
cd /foo/bar     
```

### the `source` built-in

The `source` command executes the commands listed in a specified text file. The shell searches for the file in the `PATH` directory:

```
# execute the commands in the text file 'foo'
source foo
```

### the `pwd` built-in

The `pwd` ('process working directory') command prints the current working directory of the shell.

### the `help` built-in

The `help` command prints information about the built-in commands:

```
# list the built-in commands
help

# display information about the 'cd' command
help cd
```