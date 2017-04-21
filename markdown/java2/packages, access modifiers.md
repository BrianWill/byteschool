# Java packages and access modifiers

## packages and imports

Java types (classes, interfaces, and enums) are organized into packages.

A package's name corresponds to its directory, *e.g.* the package named `foo.bar.ack` is located at path `foo/bar/ack`.

A package and its 'subpackages' have no necessary relationships, *e.g.* the package `foo.bar` and its 'subpackage' `foo.bar.ack` have no necessary relationship. A 'subpackage' is really just a separate, independent package.

Every source file begins with a `package` statement:

```java
package foo.bar.ack;        // declare that this source file is part of package 'foo.bar.ack'
```

To refer to a type from another package by name, we prefix the name with its package, *e.g.* for the type `Cat` in package `foo.bar`, we refer to it as `foo.bar.Cat`.

After the `package` statement, each source file has zero or more `import` statements. If we import a type, we can refer to it in the source file by just its name without prefixing its package, *e.g.* we can write `Cat` instead of `foo.bar.Cat`.

Each `import` statment specifies a single type to import from another package *OR* specifies a whole package to import:

```java
import foo.bar.Cat;              // import type 'Cat' from package 'foo.bar'
import alice.bob.carol.*;        // import every type from package 'alice.bob.carol'
```

## standard library packages

The standard library package names all begin with `java` and `javax` ('x' as in 'extension').

The package `java.lang` contains some types that are essential to the language itself, such as the classes `java.lang.String` and `java.lang.Object` (the ancestor of all other classes).

All types in package `java.lang` are always implicitly imported, so we never need to import them explicitly.

## access modifiers

A Java type (a class, interface, or enum) can be prefixed with the reserved word `public`. A type that is not public cannot be imported or referred to by name in other packages.

A Java source file can contain any number of types, but only one type in a source file can be marked public. The source file's name must match the name of its public type, *e.g.* a source file containing a public class *Foo* should be called `Foo.java`.

A class member (a field or method of a class) can be prefixed with the reserved words `public`, `private`, or `protected`:

 - A public member can be referred to by name in other classes. 
 - A private member can only be referred to by name in its own class.
 - A protected member can only be referred to by name in its own class or in child classes thereof.
 - A member that is neither public, private, nor protected can only be referred to by name in its own package and in children of its class.

Be clear that these access modifiers exist simply to help enforce structural choices of the programmers. Once a program compiles, these access modifiers have no bearing on how the code executes. In principle, any Java code that compiles would compile and run just the same if everything in it were made public.