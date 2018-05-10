# Java classes, methods, and constructors

## classes

A Java class is a blueprint for a data type consisting of fields (data elements) and methods. An instance of a class is very much like a Javascript object---in fact, Java instances are also called 'objects'---but a Java instance has a fixed set of fields and methods: a class specifies everything its instances have, no more, no less.

Here's an example class:

```java
class Cat {
    int age;              // an int field called 'age'
    weight float;         // a float field called 'weight'
    name String;          // a String field called 'name'

    // a method called 'meow' with no parameters and returning nothing (denoted by reserved word 'void')
    void meow() {
        // ... statements of the method
    }

    // a method called 'eat' taking a float parameter called 'kgFood' and returning a float
    float eat(float kgFood) {
        // ... statements of the method
    }
}
```

All class, interface, and enum names must begin with a capital letter. (Note that *String* is capitalized: Java strings are instances of the built-in *String* class.)

The fields and methods need not be written in any particular order, but it's common convention to put the fields before the methods.

A method is preceded by its return type. A method must return its declared type. For methods that return no value, the reserved word `void` is used to indicate the absence of any return type.

Fields and method parameters store values just like variables, and so they must have declared types. We can only assign values of the declared type to a field, and we can only pass values of the declared type to a parameter. If we break these rules, the compiler will know!

## constructors and the `new` operator

Every class has one or more `constructors`, special methods that get called when an instance of the class is created. The idea is that we often wish to configure the fields of a class or perform other business when creating instances. Often, though, we just want simple constructors that just assign values to the fields.

A constructor is written like a method but has no return type and its name matches the class's name:

```java
class Cat {
    int age;
    float weight;
    String name;

    // a constructor with a float parameter 'weight' and a String parameter 'name'
    Cat(float weight, String name) {
        // the special reference 'this' is the newly created instance
        this.age = 0;              // assign 0 to the field 'age' of the new instance
        this.weight = weight;      // assign value of parameter 'weight' to the field 'weight'
        this.name = name;          // assign value of parameter String to the field 'String'
    }

    // ... other stuff
}
```

There is no requirement to initialize every field. A primitive field defaults to `0 `(or `false` for a boolean), and a reference field defaults to `null`.

If we don't give our class a constructor, it implicitly has a do-nothing constructor with no parameters.

To create an instance of a class, we use the `new` operator before a call to a constructor of the class. A new instance is created and passed to the constructor call:

```java
Cat c;                           // create a variable 'c' of type 'Cat'
c = new Cat(6.5, "Mittens");     // create a new instance of 'Cat', passing it to the constructor with the arguments 6.5 and "Mittens"
```

We can use `return` in a constructor to exit the call, but a constructor never returns a value. (Strictly speaking, when we use the `new` operator, the operator itself returns the new instance, not the constructor it calls.)

We access the fields and methods with the dot operator:

```java
Cat c = new Cat(6.5, "Mittens");
int i = c.age;
c.weight = c.weight + 1.2;       // the Cat gained weight
c.meow();                        // call the 'meow' method of 'Cat', passing instance 'c' to 'this'
```

Referring to non-existent fields or methods triggers a compile error:

```java
Cat c = new Cat(6.5, "Mittens");
c.bark();                        // compile error: a Cat instance has no such method
```

## constructor overloading

A class can be given multiple constructors as long as the number of parameters and/or types of parameters differ. The compiler distinguishes between calls to the different constructors by the types and number of arguments.

The first line of a constructor can be a call to another constructor of the same class, and such a call passes the new instance implicitly:

```java
class Cat {
    int age;         // an int field 'age'
    float weight;    // a float field 'weight'

    // a constructor of Cat taking an int and a float
    Cat(int age, float weight) {
        this.age = age;
        this.weight = weight;
    }

    // another constructor of Cat, but this one takes no arguments
    Cat() {
        Cat(5, 10.0);       // 'this' implicitly passed to other constructor
    }
}
```

Above, the second constructor acts as a convenient way to create a Cat with default values. We never need more than one constructor, but sometimes extra constructors are convenient to use.

(Be clear there are only two places we can call a constructor: after the `new` operator, and as the first statement in another constructor of the same class.)

## method overloading

A single class can have ***overloaded*** methods---multiple methods of the same name---as long as the compiler can distinguish between calls to the methods by the types of the arguments.

```java
class Cat {
    void foo(int a) {
        // ...
    }

    int foo(int a, String b) {
        // ...
    }

    // ok: types in different order from above
    void foo(String a, int b) {
        // ...
    }

    // compile error: calls to this 'foo' cannot be distinguished from calls to the first 'foo'
    float foo(int a) {
        // ...
    }
}

// ... elsewhere in code
Cat c = new Cat();
c.foo(3, "hi");               // call the second 'foo' method
```

The return types of the overloads do not matter, nor do the names of the parameters.

Be clear that there is not necessarily any logical relationship between overloads. For code clarity, we should only create overloads that more or less do the same thing but take different inputs, but that's left up to us: the language cannot enforce this guideline. As far as Java knows, two overloads are wholly separate methods that just happen to have the same name.

## class access modifiers

A field or method can be prefixed with the reserved words `public`, `private`, or `protected`:

 - A `public` member can be referred to by name in other classes. 
 - A `private` member can only be referred to by name in its own class.
 - A `protected` member can only be referred to by name in its own class or in child classes thereof.
 - A member that is neither `public`, `private`, nor `protected` can only be referred to by name in its own package and in children of its class.

These access modifiers exist simply to help enforce structural choices of the programmers. Once a program compiles, these access modifiers have no bearing on how the code executes. In principle, any Java code that compiles would compile and run just the same if everything in it were made `public`.