# Java interfaces

An ***interface*** specifies a set of method names along with parameter types and return types for these named methods:

```java
// an interface named Dog
interface Dog {
    String bark(int, String);      // method named 'bark' returns a String and takes an int and a String
    void woof();                  // method named 'woof' returns nothing and takes nothing
    int eat(float);                // method named 'eat' returns an int and takes a float
}
```

Any class which has all the methods specified in an interface may ***implement*** that interface. In essence, **an interface represents a set of method names (and their types) which its implementing classes have in common**.

A class implementing an interface can contain any number of other methods. In fact, a single class can implement any number of interfaces.

A class specifies what interfaces it implements with an `implements` clause after its `extends` clause. If the class implements multiple interfaces, they are separated by commas; if the class implements no interfaces, the clause is omited.

```java
// compile error if Pug does not have the methods listed in Dog
class Pug extends Mammal implements Dog {
    // ... 
}
```

There is no such thing as an instance of an interface itself, but instances of the implementing classes are considered instances of the interface. So if we create a variable of an interface type, we can assign instances of any implementing class to that variable:

```java
Dog d;                    // like any other reference variable, 'd' starts out null
d = new Pug();            // compile error if 'Pug' does not implement 'Dog'
```

Through an interface reference, we can call the methods of that interface, but we cannot call other methods of the instance or access its fields:

```java
Dog d = new Pug();
d.woof();                 // call 'woof' on the 'Pug' instance
```

As far as the compiler is concerned, an interface reference is only guaranteed to have the methods of the interface, not anything else. To access the instance fields and other methods, we must downcast to get a reference of the instance's type:

```java
Dog d = new Pug();
Pug p = (Pug) d;          // downcast 'd' to a 'Pug' 
```

Just like when downcasting a class reference to a descendent class, an exception is thrown if the instance's type is not the specified type.