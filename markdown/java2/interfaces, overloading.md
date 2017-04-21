
# Java interfaces and method overloading

## interfaces

Whereas the Go compiler will assume a type implements an interface because it has all the right methods, in Java, a class must explicitly declare which interfaces it implements using the reserved word `implments`:

```java
class Cat implements Eater, Drinker, Sleeper {
    // ... must include the methods of interfaces 'Eater', 'Drinker', and 'Sleeper'
}
```

If a class does not have the methods required by an interface it claims to implement, compilation fails.

The danger with Go's interfaces is that a type might implement an interface without our explicit intention. In theory, this could lead to a type inadvertently implementing an interface, which might lead to type errors the compiler wouldn't catch. In practice, such errors are very unlikely, so Go decided to favor convenience and brevity. Java conversly, chose type safety.

## method overloading

When Java sees a method call, it determines what method to call not just from the name but also from the types of the number of parameters and the types of parameters. So a single class can have ***overloaded*** methods---multiple methods of the same name---as long as the compiler can distinguish between calls to these methods. 

```java
class Cat {
    void foo(int a) {
        // ...
    }

    int foo(int a, char b) {
        // ...
    }

    // ok: types in different order from above
    int foo(char a, int b) {
        // ...
    }

    // compile error: calls to this 'foo' cannot be distinguished from calls to the first 'foo'
    float foo(int a) {
        // ...
    }
}
```

(It doesn't matter whether the return types are the same or different. Only the parameters---their types, their order, and their number---matter.)

Be clear that there is not necessarily any logical relationship between overloads. For code clarity, we should only create overloads that more or less do the same thing though they take different inputs, but that's left up to us: the language cannot enforce this guideline.

Because there are cases where some types can be implicitly cast to others and cases where some types are substitable for others (such as when a class implements an interface), the rules for how exactly the compiler matches a method call to a method get surprisingly complicated. Rather than studying and memorizing these rules, we can lean on a Java IDE (like Eclipse, NetBeans, or IntelliJ) to tell us which overload a method call actually invokes.