# Java exceptions, assertions

## exceptions

Whereas a thrown exception in Javascript can be any kind of value, a thrown exception in Java must be an instance of `java.lang.Throwable` (or subtype thereof).

The `Throwable` class has two children:

 - `java.lang.Error`: thrown in abnormal circumstances, and so not normally caught
 - `java.lang.Exception`: thrown under more normal circumstances, and so often caught

 ## checked exceptions

The `java.lang.Exception` class has a child `java.lang.RuntimeException`:

 - an exception which is a `java.lang.RuntimeException` (or subtype thereof) is an ***unchecked exception***
 - an exception which is a `java.lang.Exception` (or subtype thereof, excluding `java.lang.RuntimeException`) is a ***checked exception***

 ```java
throw new Exception();                   // throw a checked exception
throw new RuntimeException();            // throw an unchecked exception
 ```

A method which may throw a checked exception has to declare that it may do so with a `throws` clause:

```java
// this method potentially throws checked exception type 'SomeException'
void foo() throws SomeException {
    // ...
}
```

Checked exceptions are a controversial feature of Java. The theory goes that, by marking a method with the checked exceptions it may throw, the compiler discourages the programmer from blithly ignoring exceptions it might throw. Some Java programmers think this feature is just annoying and so throw only unchecked exceptions.

## try-catch

Unlike in Java, a `catch` clause of a `try-catch` must specify what kind of exceptions it will catch:

```java
try {    
    // ...
} catch (Foo ex) {    // this catch clause will only catch exceptions which are of type 'Foo' (or subtypes thereof)
    // ...
}
```

A `try-catch` can have multiple `catch` clauses if they specify different types to catch. The `catch` clause executed (if any) 
is the first with a matching type:

```java
try {
    // ...
} catch (Foo ex) {
    // ...
} catch (Bar ex) {
    // ...
}
```

After the `catch` clause(s), we can put a `finally` clause. The finally clause will be executed after any `catch` clause, but also if no `catch` clause is executed, and even after a `return` statement. In other words, once execution enters a `try`, its `finally` clause will execute before we leave the method no matter what.

## assert statements

An `assert` statement takes a boolean expression and throws a `java.lang.AssertionError` if the expression is `false`:

```java
assert x < 3;                                // throws an AssertionError if the 'x' is not less than 3
```

Optionally, we can add a string or number argument for constructing the `AssertionError` using a colon:

```java
assert x < 3: "x should be less than 3";     // if false, throws an AssertionError constructed with the string as argument
```

This `assert` statement is basically the equivalent of...

```java
if (x < 3) {
    throw new AssertionError("x should be less than 3");
}
```

...but with one important difference: when running a program, we can tell the runtime to skip over the `assert` statements. This makes `assert` statements useful for adding extra checks of code correctness that we want to enable during development but disable in the release version.