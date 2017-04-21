# Java nested classes and lambda expressions

A ***nested class*** is a class defined inside another class. There are five kinds:

 - instance inner classes
 - static inner classes
 - local classes
 - anonymous classes
 - lambda expressions

Inner classes are of questionable utility. Local classes, anonymous classes, and lambda expressions, however, are convenient for classes which only get referred to by name in one method of our code. 

A broad rule applies to all four kinds of nested class: access modifiers on members of the outer class do not restrict access in the nested class, nor do access modifiers on members of the nested class restrict access in the outer class.

## static inner classes

A ***static inner class*** is just like an ordinary class, but it is written as a static member of another class simply for organization's sake. Outside the containing class, the name of a static nested class must be prefixed by the containing class name (just like any other static member):

```java
class Foo {

    // a class known as 'Foo.Bar'
    public static class Bar {
        // ...
    }

    // ...
}
```

Static inner classes are pointless. Just create normal classes instead.

## instance inner classes

An ***instance inner class*** is written as an instance member of another class: 

```java
class Foo {

    // a class 'Bar' which belongs to every 'Foo' instance
    public class Bar {
        // ...
    }

    // ...
}
```

Each instance of the inner class is associated with an instance of the outer class, so to instantiate the inner class, we do so *via* an instance of the outer class:

```java
Foo f = new Foo();
Foo.Bar b = f.new Bar();       // create a new instance of 'Foo.Bar' associated with 'Foo' instance 'f'
```

(Note the inconsistency: outside *Foo*, we refer to *Bar* as *Foo.Bar* except when instantiating it.)

To refer to the associated outer class instance inside the inner class, we prefix `this` with the outer class name:

```java
class Foo {

    public int x = 3;
    private int y = 7;

    // a class 'Bar' which belongs to every 'Foo' instance
    public class Bar {
        void ack() {
            // assign 'y' of the outer instance to 'x' of the outer instance
            Foo.this.x = Foo.this.y;
        }
    }

    // ...
}
```

Outside the inner class, we cannot directly get the associated outer class instance from an inner class instance. We can do so indirectly, though, if you return it from a method of the inner class:

```java
class Foo {
    public class Bar {
        // method that returns the outer class instance
        public Foo getOuter() {
            return Foo.this;
        }
        // ...
    }
    // ...
}
```

## local classes

A ***local*** class is declared inside a method. A local class in an instance method is like an instance inner class, and a local class in a static method is like a static inner class, but there are differences:

 - a local class cannot be referred to by name outside the containing method
 - a local class has no access modifier
 - a local class can access the `final` local variables declared above it in the containing method

```java
class Foo {
    public int ack() {
        final int x = 3;
        // local class 'Bar'
        class Bar {
            public int getX() {
                return x;            // 'x' of the containing method
            }
        }
        Bar b = new Bar();
        return b.getX();
    }
}
``` 

Local classes are Java's closest analogue of Javascript's closures, but a true closure would have access to the non-`final` variables of the containing method.

## anonymous classes

An ***anonymous class*** is a more convenient (but more limited) variant of a local class:

 - it has no name
 - it is instantiated in just one place
 - it cannot define constructors
 - it can implement only one interface
 - it extends java.lang.Object if it implements an interface

Creating and instantiating an anonymous class looks like instantiating its parent class, but the parens are followed by curly braces containing the members of the anonymous class:

```java
// assign an anonymous class extending 'Mammal' to 'm'
// (the parens surrounding the anonymous class are not required but included here for clarity)
Mammal m = (new Mammal() {
    // a field of this anonymous class
    private int x = 5;

    // a method of this anonymous class
    public void foo() {
        // ...
    };
});
```

If an anonymous class implements an interface, we write the interface name in place of the parent class, the class implicitly extends `java.lang.Object`, and the constructor always takes no arguments.

A `new` operation creating an anonymous class is considered by the compiler to be returning an instance of the parent (or an instance of the implemented interface). Because an anonymous class has no name, we can't create references of its type. These two facts together mean that, outside the anonymous class, we cannot directly use any method or field which is not inherited (or overridden) from its parent (or implemented by the interface it implements). If this is a problem, create a local class instead.

## lambda expressions

A ***lambda expression*** is more convenient variant of an anonymous class, but it's even more limited:

 - it always extends `java.lang.Object`
 - it cannot have fields
 - it can only implement an interface with one method

The interface to implement is inferred from:

 - the type of the variable to which we assign the lambda
 - *or* the type of the parameter to which we pass the lambda

The name of the interface, the name of the method, and the types of the parameters are left implict. We write the parameter names in parens, separated by commas, followed by `->` and then the method body in curly braces:

```java
interface Adder {
    public int add(int, int);
}

// ... elsewhere in code
// assign a lambda implementing 'Adder' to 'a'
// (the parens surrounding the lambda are not required but included here for clarity)
Adder a = ((x, y) -> {
    return x + y;
});
```

If the method has one parameter, the parens surrounding the parameter can be omitted.

If the method body has just one statement, the surrounding curly braces, `return`, and the semicolon after the statement can be omitted:

```java
Adder a = ((x, y) -> x + y);       // same as previous example
```






