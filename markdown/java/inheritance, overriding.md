# Java class inheritance and method overriding

## class inheritance

A Java class can inherit from one other class. What a 'child' class inherits from its 'parent' class is all of the parent's fields and methods:

```java
class Mammal {
    int age;
    float weight;

    void eat() {
        // ...
    }

    void sleep() {
        // ...
    }
}

// 'Cat' inherits from 'Mammal'
class Cat extends Mammal {
    int lives;

    void meow() {
        // ...
    }
}
```

The *Cat* class extends (inherits from) *Mammal*, so in addition to its own *lives* field and *meow* method, it also has *age* and *weight* fields as well as *eat* and *sleep* methods. In short, a child class has everything its parent does plus more.

If a class does not explicitly extend another, it implicitly extends a special built-in class called *Object*. A child class can have its own children, and thus classes in Java form a hierarchy with *Object* at the root. All classes are descendents of *Object*. This *Object* class contains several methods, which we'll discuss later.

Because a descendent has everything which its ancestors have, the compiler accepts a descendent as a valid substitute for an ancestor:

```java
Mammal m = new Cat();
```

Above, we can assign a *Cat* to a *Mammal* variable because a *Cat* is guaranteed to have all of the fields and all of the methods of a *Mammal*. However, we can only access the fields and methods of *Mammal* *via* the *m* variable:

```java
Mammal m = new Cat();
m.eat();                  // ok
m.meow();                 // compile error: 'Mammal' has no method 'meow'
```

You'd think the compiler should be able to figure out what type of instance the variable *m* references. Well, in *this* case it could, but in other cases it couldn't:

```java
Mammal m = new Cat();
if (x < 3) {
    m = new Dog();
}
m.meow();                 // depending on value of 'x', 'm' here might reference a 'Dog' rather than a 'Cat'
```

Because of such cases (which are very common), the compiler doesn't presume to know the type of the referenced instance at any point.

This rule that descendents can substitute for their ancestors applies when we pass arguments to a method or return values from a method:

 - A method that is supposed to take a *Mammal* instance as argument can take a *Cat* instance as argument instead.
 - A method that is supposed to return a *Mammal* instance can return a *Cat* instance instead.

Having substituted a Cat for a Mammal, we can only get the Cat instance *as a Cat* again by casting. Such a 'downcast' performs a type check at runtime, throwing an exception if the check fails: 

```java
Mammal m = new Cat();
Cat c = (Cat) m;          // type check at runtime passes ('m' references a 'Cat')
c.meow();                 // ok
m = new Mammal();
c = (Cat) m;              // exception: type check at runtime fails ('m' references a 'Mammal')
```

Be clear that a downcast does not produce a new instance: 

- a downcast tells the compiler that what the compiler knows to be an *X* instance will actually be a specified descendent of *X*
- a downcast also perform a runtime check of the instance's type: an exception is thrown if the instance is not actually the specified descendent type

In other words, the compiler accepts our claim that this *Mammal* is actually a *Cat*, but this claim is checked when the downcast is executed.

## method overriding

If a child class defines a method *foo* while inheriting a method *foo* with different parameter types, then *foo* is simply overloaded in the child class: the two methods just happen to have the same name, but otherwise have no necessary relation. 

However, if a child class defines a method *foo* while inheriting a method *foo* with the *same* parameter types, then *foo* is ***overridden***. When we call a method that has been overridden, the method to call may be partly determined at runtime when execution reaches the call:

```java
// assume 'Cat' overrides 'eat' from 'Mammal'
Mammal m = new Mammal();
m.eat();                        // call 'eat' of 'Mammal'
m = new Cat();
m.eat();                        // call 'eat' of 'Cat'
```

Above, which *eat* gets called depends upon what type of instance *m* references at the time of the call: when *m* references a *Mammal* instance, the call invokes *eat* of *Mammal*; when *m* references a *Cat* instance, the call invokes *eat* of *Cat*.

Now imagine we have a class *A* which extends *B*, which extends *C*, which extends *D*, which extends *E*:

 - instances of *A* and *B* have the version of *foo* defined in *B*
 - instances of *C*, *D*, and *E* have the version of *foo* defined in *E*

In short, which override gets invoked depends at runtime on the type of the actual instance. Each type either defines its own override, or it inherits the last override up the chain of inheritance.

Sometimes the compiler can determine which override to call, but sometimes the decision has to be left until the call is actually made at runtime:

```java
A a;
B b;
C c;
D d;
E e;
// ... the above variables get initialized 
a.foo();                      // compiler knows this can only call 'foo' of 'B'
b.foo();                      // compiler knows this can only call 'foo' of 'B'
c.foo();                      // compiler cannot know whether to call 'foo' of 'B' or of 'E'
d.foo();                      // compiler cannot know whether to call 'foo' of 'B' or of 'E'
e.foo();                      // compiler cannot know whether to call 'foo' of 'B' or of 'E'
```

Above, variables of types *A* and *B* can only reference instances with method *foo* of *B*. The variables of types *C*, *D*, and *E* might reference instances with method *foo* of *B*, but they also might reference instances with method *foo* of *E*. So for the last three calls, the compiler can narrow down the choices to two methods, but the final decision between the two is made only when execution reaches the call at runtime.

Be careful not to confuse overriding and overloading! Overloads are separate methods that just happen to have the same name. The compiler always decides which overload a call refers to at compile time.