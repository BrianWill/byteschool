## packages

Go code is organized into namespaces called packages. The first line of code in a source file must be a *package statement* stating the name of the containing package:

```
package foo;            // this source file is part of a package called 'foo'
```

The source files of a package should all be stored in a directory under `GOPATH/src` ('src', short for 'source'). The relative path to this directory is the package's ***import path***. For example, a package stored at `GOPATH/src/foo/bar/ack` has import path `foo/bar/ack`. By convention, the last component of a package's import path should be the same as its name, *e.g.* each source file in `GOPATH/src/foo/bar/ack` would have `package ack;` as its first statement.

To use code from another package in a source file, you must import that package by its import path using an `import` statement:

```
import "foo/bar/ack";    // import the package at path foo/bar/ack
```

The `import` statements in a file must all go underneath the `package` statement but before anything else.

To use the elements of an imported package, we prefix their names with the package name, separated by a dot. For example, if we import a package called *foo*, we write *`foo.Bar`* to access *Bar* defined in that package.

Only names beginning with capital letters can be accessed by name from other packages. If you only need something in the local package, it's generally best to keep it 'private' to the current package by giving it a name beginning with a lowercase letter.

## *main* function

Execution of a program begins by calling the function *main* inside a package named *main*. The *main* function takes no input and returns no output.

## libraries

A ***library*** is a body of existing code meant to be incorporated by other programs. Libraries typically solve common, general problems. A language's *standard library* is a body of code that comes stock with the language.

Go's standard library is made up of several dozen packages. The standard library packages have short import paths like "fmt", "os", and "time".

## compiling Go

To compile Go code, you'll need to install and set up the Go tools:

 1. download the installer for your platform from [golang.org](http://golang.org)
 2. run the installer
 3. create a directory under which you want to keep all of your Go source code
 4. create an [***environment***](https://en.wikipedia.org/wiki/Environment_variable) variable called *GOPATH*, setting it to your new directory 
 5. if you don't have it already, install [Git](https://git-scm.com/downloads)

(Here are more detailed instructions for [Windows](http://www.wadewegner.com/2014/12/easy-go-programming-setup-for-windows/).)

The Go tools are meant to be run from the command line because we need to pass in arguments. The first argument to `go` is the *subcommand*, which specifies what you want to do, *e.g.* *run*, *build*, *install*.

## `run` subcommand

The `run` subcommand is meant only for running very small example programs. It compiles the specified source file(s) into an executable, runs it, and then deletes the executable when the program finishes.

```
go run file1.go file2.go
```

...where *file1.go* *file2.go* are the paths of Go code source files. The specified source files must end in the extension `.go`, and they must all have `package main;` at the top. One (and just one) of these files must have a *main* function.

## `build` subcommand

The `build` subcommand compiles a package. If the package's name is *main*, `build` creates an executable. The package to build is specified by its import path:

```
go build foo/bar
```

If the package imports other packages, those packages automatically get compiled first.

## `install` subcommand

The *GOPATH/bin* directory ('bin' short for 'binary', as in binary machine code) is for storing executables. The *GOPATH/pkg* directory ('pkg' short for 'package') is for storing *object files* (files of compiled but unlinked machine code). When a package imports another, the compiler first looks under *GOPATH/pkg* for already existing object files. Only if the source files have changed since the last recompilation will Go recompile the package.

The `install` subcommand builds a package just like `build`, but it also puts any resulting executable in *GOPATH/bin*, and it puts any resulting object files under respective directories of *GOPATH/pkg* (for example, the object file generated from a package *GOPATH/src/foo/bar* gets placed under *GOPATH/pkg/foo/bar*).

We generally prefer `install` over `build` because it effectively caches the compiled packages. Subsequent `install` and `build` commands only recompile packages in which the source files have changed since the package was last installed.

## `get` subcommand

The `get` subcommand downloads a package and then installs it. This only works when the import path matches a `git` or `mercurial` repo URL. For example, say I have a repo at URL *github.com/BrianWill/foo* in which the base directory is a package with import path "github.com/BrianWill/foo". Running `go get github.com/BrianWill/foo` will download the contents of this repo to `GOPATH/src/github.com/BrianWill/foo` and install the package.

The `get` subcommand is handy when you want to use a package someone has posted on [github.com](http://github.com) (or a similar repo hosting service).
