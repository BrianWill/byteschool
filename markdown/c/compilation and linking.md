# C compilation and linking

Each C source file is compiled separately into an ***object file***. An object file contains compiled code, but the addresses of globals and functions referenced from other source files need to get patched in by a ***linker*** program. From one or more object files, a linker creates an executable or creates a library file.

Before we can call a function or use a global variable, the compiler needs to see its declaration in the source file. In short, anything you use in a source file must be declared in that source file, even if it is defined in another source file.

Before we can refer to a data type by name, the compiler needs to see its declaration in the source file. (Data types are declared but never defined: a type by itself requires no storage in memory or code). 

In short, C compilers expect every name they see used to be declared beforehand:

```c
void
foo() {
    bar();    // compiler error: 'bar' has not been declared
}

void
bar() {
    // ...
}
```

We could fix the above by simply moving the definition of *bar* above *foo* (remember that definitions are also declarations), but what if the functions were mutually recursive? What if *bar* also called *foo*? In that case, we could only satisfy the compiler by adding a declaration of *bar*:

```c
// declare 'bar'
void
bar();   

void
foo() {
    bar();    // ok: the compiler knows what 'bar' is
}

void
bar() {
    // ...
}
```

If we put a declaration of each function before any of the definitions, we could effectively write the definitions in any order no matter which function called which. Writing all these declarations is inconvenient, so C programmers create *header files* and use `#include` directives.

## `#include` directives

A line starting with `#` is a special line called a ***directive***. Directives manipulate the source text before the compiler reads the text (these changes are not saved: the source file remains unchanged by compilation). 

The `#include` directive is replaced by the whole content of a specified file:

```c
// the #include line below is replaced by the contents of foo.txt
#include <foo.c>
```

The included file could be any text file, but usually it is a C header file.

If the file path is enclosed in angle brackets, the compiler searches for it in a list of directories. (How this list is defined depends upon the compiler.)

If the file path is enclosed in double quotes, the compiler searches for it in the directory of the source file; if not found there, the compiler searches through the list of directories as with angle brackets.

## header files

For every *.c* source file, usual practice is to create a *.h* *header* file. For every thing we define in our source file, we put a declaration of that thing in the corresponding header file. For example, for source file *foo.c*, we create header file *foo.h*, and for every definition in *foo.c*, we put a declaration of that thing in *foo.h*.

If in *bar.c* we wish to use the stuff defined in *foo.c*, we simply `#include` *foo.h* in *bar.c*. Everything defined in *foo.c* would then effecively be declared in *bar.c*.