# Java generics

As we've covered, any descendent type can substitute for an ancestor, *e.g.*, for a *Mammal* field, the assigned instance could be a *Cat* or *Dog* or any *Mammal*:

```java
class Pet {
    public Mammal m;
}

// ... in some method elsewhere
Pet p = new Pet();
p.m = new Dog();
```

What ***generic classes*** let us do is limit an instance to a specific descendent, *e.g.* the *Mammal* field in this instance can only be assigned a *Cat* (or a descendent thereof). This restriction is enforced by the compiler, giving us stronger assurances of type correctness and sparing us from having to explicitly downcast in certain cases. By making the *Pet* class generic, we can get the compiler to enforce a distinction between different kinds of *Pet*'s without us having to write separate classes for each kind.

A generic class has one or more ***type parameters*** separated by commas in angle brackets after the class name. The parameter names must begin with capital letters but otherwise can be any identifier. Most commonly we use the letters *T*, *U*, and *V* (it's uncommon to give a class more than three type parameters). For each type parameter, we specify the actual type it represents with an `extends` clause:

```java
// a generic class 'Pet' with type parameter 'T' of type 'Mammal'
class Pet<T extends Mammal> {
    public T m;
}
```

(If a type parameter has no `extends` clause, it extends `java.lang.Object` by default.)

Having defined this generic class, we can use it like an ordinary class, in which case *T* will be *Mammal* (both at runtime and as known to the compiler):

```java
Pet p = new Pet();
p.m = new Dog();
```

However, when we specify a type argument for *T*, the compiler will enforce the type. The type argument must be valid for the parameter, *e.g.* for a type parameter extending *Mammal*, the type argument must be a *Mammal* (or descendent thereof):

```java
Pet<Cat> c;                        // declare variable 'c' of type Pet<Cat>
Pet<Dog> d;                        // declare variable 'd' of type Pet<Dog>
Pet<Slug> s;                       // compile error: a 'Slug' is not a 'Mammal'
c = new Pet<Cat>();
d = new Pet<Dog>();
c = d;                             // compile error: a Pet<Dog> is not a Pet<Cat>
c.m = new Cat();                   // OK
c.m = new Dog();                   // compile error: field 'm' of a 'Pet<Cat>' can only be assigned a 'Cat'
Cat mittens = c.m;                 // OK
```

In this last line, the actual type of field 'm' at runtime is always a *Mammal*, but for a *Pet\<Cat\>*, the compiler enforces field *m* to be assigned only *Cat*'s, so no downcast from *Mammal* to *Cat* is required.

While an array of *Cat*'s is a subtype of an array of *Mammal*'s, perhaps surprisingly, a *Pet\<Cat\>* is *not* a subtype of *Pet\<Mammal\>* even though *Cat* is a subtype of *Mammal*:

```java
Pet<Mammal> p = new Pet<Cat>();    // compile error: 'Pet<Cat>'' is not a subtype of 'Pet<Mammal>'
p.m = new Dog();                   // we don't want this to be possible
```

If Java allowed a *Pet\<Cat\>* to substitute for a *Pet\<Mammal\>*, then the *m* field of a *Pet\<Cat\>* instance could be assigned a *Dog*, defeating the type assurance that generics are supposed to provide.

## wildcard references

A ***wildcard reference*** specifies `?` as one or more of the type arguments. Any concrete type is considered a subtype of the wildcard type. There's no such thing as wildcard instances:

```java
Pet<?> p;                          // declare 'p' of type 'Pet' with wildcard type argument
p = new Pet<Cat>();                // OK
p = new Pet<Dog>();                // OK
p = new Pet();                     // OK
p = new Pet<?>();                  // compile error: no such thing as a wildcard instance
```

The wildcard type argument is known by the compiler to be some kind of *Mammal*, so we can read the field as *Mammal* through the wildcard, but it might be something more specific than a *Mammal*, so we can't assign anything to the field through the wildcard:

```java
Pet<?> p = new Pet<Cat>();
Mammal m = p.m;                    // OK
p.m = new Mammal();                // compile error: cannot assign to wildcard type parameter
```

For generics with multiple type parameters, some type arguments can be wildcards and some can be concrete. Only concrete types with matching concrete type arguments are subtypes:

```java
Foo<?, Mammal, ?> f;               // declare 'f' of type 'Foo' with two wildcards and one concrete type 'Bar'
f = new Foo<Cat, Mammal, Dog>;     // OK
f = new Foo<Dog, Cat, Dog>;        // compile error: second type argument is not 'Mammal'
```
