# the Java language

(Our coverage of Java assumes familiarity with Javascript but no other programming language.)

## static typing vs. dynamic typing

Java is a statically-typed language whereas Javascript is a dynamically-typed language.

In a statically-typed language, each variable (including each function parameter) is marked by a designated type such that only values of the designated type can be assigned to the variable. Functions and methods are also marked by a 'return type', such that we must always return values of that type (and only that type) from the function or method.

A compiler for a static language will refuse to compile the code if we:

 - use the wrong type of operands in an operation
 - assign the wrong type of value to a variable
 - pass the wrong type of argument to a function or method
 - return the wrong type of value from a function or method

In a dynamically typed language like Javascript, the code will compile and execute regardless of such problems. However, when an operation in a dynamic language is executed with the wrong type(s) of operands, an error occurs, aborting execution.

Static typing has the advantage of detecting all ***type errors*** at compile time, before the code even runs. With dynamic typing, a type error may lurk undetected in some uncommonly executed branch of code. On the other hand, static typing can require more thinking about types up front, which may feel onerous or inhibiting. Some programmers prefer static typing; others prefer dynamic typing.

## classes, interfaces, and enums

The top level of Java code consists of three kinds of type definitions:

 - a ***class*** is a data type blueprint comprised of zero or more ***fields*** (named elements, like Javascript object properties) and zero or more methods; an ***instance*** of a class is a value with the class's set of fields and methods
 - an ***interface*** is a list of method names; a class which has all the methods listed in an interface can ***implement*** the interface (discussed later)
 - an ***enum*** ('enumeration') is an occasionally-used minor variation of class

## compiling and running Java code

Java source code is compiled into Java ***'bytecode'***, which resembles machine code, but no CPU can directly execute Java bytecode. It's like machine code for a fictional machine that doesn't actually exist.

The compiled bytecode can then be interpreted by a ***Java runtime*** program. So we always compile Java code to one standard format and then can run it on any system with a Java runtime. This (in theory) makes our Java code more portable.

Because interpretation is less efficient than natively-compiled code, most Java runtimes will [JIT (Just-in-time) compile](https://en.wikipedia.org/wiki/Just-in-time_compilation) some or all of the bytecode: when a chunk of bytecode is executed repeatedly, the runtime may decide it is worth the cost of compiling into native machine code, in which case the runtime can subsequently jump execution to this machine code instead of interpreting the chunk of bytecode.

So we need two programs to compile and run Java code: a Java compiler and a Java runtime. Oracle's Java compiler is called `javac` and its runtime is called `java`.

## `.java` and `.class` files

A file of Java source code must end in `.java`. Each source file can contain multiple types (classes, interfaces, or enums), but only one type can be 'public' (described later). The name must match the public type of the file, *e.g.* a source file containing a public class Foo must be called `Foo.java`.

When a source file is compiled, each type is compiled into a separate `.class` file. Each `.class` file contains information describing the type and contains the compiled bytecode of the methods. The file name matches the type, *e.g.* class Foo is compiled into `Foo.class`.

Types defined in one `.java` file may depend upon types defined outside the file, in which case the compiler expects to find the type in another `.java` or `.class` file.

## packages

Java types are organized into directories called ***packages***. The types in a source file belong to the containing package, and the source file must begin with a `package` statement specifying the package name:

```java
package foo.bar.ack;     // this file belongs to the package foo.bar.ack
```

The package name must correspond to the directoy path, *e.g.* files of package `foo.bar.ack` must be in directory `foo/bar/ack`. The package paths are relative to the ***classpath***, the root directory containing all of the packages of our program. We must tell the compiler and runtime the location of our classpath.

A package and its 'subpackages' have no necessary relationships, *e.g.* the package `foo.bar` and its 'subpackage' `foo.bar.ack` have no necessary relationship. A 'subpackage' is really just a separate, independent package.

To refer to a type from another package by name, we prefix the name with its package, *e.g.* for the type `Cat` in package `foo.bar`, we refer to it as `foo.bar.Cat`.

After the `package` statement, each source file has zero or more `import` statements. If we import a type, we can refer to it in the source file by just its name without prefixing its package, *e.g.* we can write `Cat` instead of `foo.bar.Cat`.

Each `import` statment specifies a single type to import from another package *OR* specifies a whole package to import:

```java
import foo.bar.Cat;              // import type 'Cat' from package 'foo.bar'
import alice.bob.carol.*;        // import every type from package 'alice.bob.carol'
```

## standard library packages

The standard library package names all begin with `java` and `javax` ('x' as in 'extension').

The package `java.lang` contains some types that are essential to the language itself, such as the classes `java.lang.String` and `java.lang.Object`.

All types in package `java.lang` are always implicitly imported, so we never need to import them explicitly.

## package access modifiers

A Java type (a class, interface, or enum) can be prefixed with the reserved word `public`. A type that is not public cannot be imported or referred to by name in other packages.

A Java source file can contain any number of types, but only one type in a source file can be marked public. The source file's name must match the name of its public type, *e.g.* a source file containing a public class *Foo* should be called `Foo.java`.

These access modifiers exist simply to help enforce structural choices of the programmers. Once a program compiles, these access modifiers have no bearing on how the code executes. In principle, any Java code that compiles would compile and run just the same if everything in it were made public.
