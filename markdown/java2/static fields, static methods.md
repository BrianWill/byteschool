# Java static fields and static methods


## static fields (global variables in disguise)

Java supposedly doesn't have global variables, but it does have *static fields*.

Normally, every instance of a class has its own copy of each field, but if a field is preceded by the reserved word `static`, instances do not get their own copy of that field. In fact, this so-called 'field' exists for the whole life of the program, even when no instances of the class exist.

In truth, **static fields are really just global variables**.

An uninitialiezd static field defaults to a zero value, but we usually initialize static fields when they are declared:

```java
class Cat {
    static int maxLives = 9;      // static field 'maxLives' is a global int variable with the initial value 9

    // ... other stuff
}
```

To refer to a static field by name, prefix the name with the class name and a dot:

```java
int i = Cat.maxLives;     // 9
```

Alternatively, we can access a static field *via* an instance of the class, but there is no reason to do so:

```java
Cat c = new Cat();
int i = c.maxLives;       // same as Cat.maxLives
```

This notation is frankly confusing and misleading: no instance has its own static fields; rather, a static field really belongs to the containing class itself. Think of a static field as a global variable that lives in the namespace of a class.

## static methods (functions in disguise)

Java supposedly doesn't have functions, but it does have *static methods*.

Normally, a method is passed an instance of its class to the special parameter `this`. However, if a method is preceded by the reserved word `static`, no instance is passed to a call to the method. Inside a static method, no `this` parameter exists.

In truth, **static fields are really just functions**.

```java
class Cat {
    // ... other stuff

    // 'foo' is a static method taking no arguments and returning an int
    static int foo() {
        return 3;
    }
}
```

To call a static method, prefix the name with the class name and a dot:

```java
int i = Cat.foo();
```

Alternatively, we can call a static method *via* an instance of the class, but there is no reason to do so:

```java
Cat c = new Cat();
int i = c.foo();       // same as Cat.foo()
```

This notation is frankly confusing and misleading: no instance is passed to the static method. Think of a static method as a function that lives in the namespace of a class.