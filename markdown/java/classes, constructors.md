# Java classes and constructors

## classes

A *class* is very much like a named struct type in Go: a class can have fields and methods. The most apparent difference is that the fields are denoted with the type name before the field name, and the methods are written inside the class itself. Because a method's receiver type is clear from where it is written, the receiver in a Java method is not explicitly declared: rather, the reserved word `this` inside a method refers to the received value. The type of `this` is the containing class type. Unlike a normal variable, we cannot assign to `this`.

Unlike in Go, methods can only have one return type and only ever return one value. The return type is written before the method name. A method that returns nothing is denoted to return `void` (which is not actually a type, just a word denoting the absense of a type). Like with other variable declarations, parameter declarations put the type before the name:

```java
// create a class Cat
class Cat {
    int age;         // an int field 'age'
    float weight;    // a float field 'weight'

    // a method 'meow' that takes no arguments and returns nothing
    void meow() {
        // ...
    }

    // a method 'gainWeight' that takes a float and returns a float
    float gainWeight(float more) {
        // 'this' references the Cat receiver value
        this.weight = this.weight + more;
        return this.weight;
    }
}
```

## constructors and the `new` operator

A constructor is a special method of a class that is called when we create an instance of a class (*i.e.* a value of the class type). Constructors should do whatever set up business is appropriate for the type. Most commonly this entails just giving the fields initial values.

A constructor is denoted by the absence of any return type and having the same name as the class itself:

```java
class Cat {
    int age;         // an int field 'age'
    float weight;    // a float field 'weight'

    // a constructor of Cat taking an int and a float
    Cat(int age, float weight) {
        this.age = age;
        this.weight = weight;
    }
}
```

We create new instances of a class with the `new` operator preceding a constructor call. A new instance is created and passed to the constructor call:

```java
Cat c;                           // declare a variable
c = new Cat(8, 12.3);            // assign to 'c' a new instance of Cat
int i = c.int;                   // 8
```

When the new object is passed to the constructor, the fields have default zero values: *age* is `0` and *weight* is `0.0`. The constructor is not required to give every field a new value. What we do in a constructor is up to us, just like any other method.

A class can be given multiple constructors as long as the number of parameters and/or types of parameters differ. The first line of a constructor can be a call to another constructor of the same class, and such a call passes the new instance implicitly:

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

// ... elsewhere in code
Cat c = new Cat();
float f = c.weight;         // 10.0
```

Above, the second constructor acts as a convenient way to create a Cat with default values. We never need more than one constructor, but sometimes extra constructors are convenient to use.

Be clear that constructors can only called be called in two ways:

 - following the `new` operator (a new instance is passed in)
 - on the first line of another constructor of the same class (the existing instance is passed in)

We can use `return` in a constructor to exit the call, but a constructor never returns a value. (Strictly speaking, when we use the `new` operator, the operator itself returns the new instance, not the constructor it calls.)

If we don't give a class any constructors, it implicitly has one constructor that takes no arguments and does nothing.

## reference variables

Java does not have pointers, but every non-primitive variable is a reference. A class variable, for example, does not store an instance of the class directly but rather just a reference:

```java
Cat c = new Cat(8, 12.3);
Cat c2 = c;                  // now 'c2' and 'c' reference the same Cat instance
```

The special value `null` represents the absense of any referenced value. Attempting to access fields or call methods *via* a null reference triggers an *exception* (Java's equivalent of a panic):

```java
Cat c = null;
c.meow();                     // exception: cannot invoke method on null
```
