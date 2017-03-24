
## reference assignment (`=`) and comparison (`==`)

When we assign primitives, the value itself is stored. When we assign reference types (classes, enums, interfaces, and arrays), only a reference is stored:

```java
int i = 3;                     // the variable 'i' stores the int value 3
Cat mittens = new Cat();       // the variable 'mittens' stores a reference to a Cat instance
```

When we compare primitives with `==`, the values themselves are compared:

```java
int i = 3;
int j = 3;
boolean b = i == j;      // true (3 is equal to 3)
j = 5;
b = i == j;              // false (3 is not equal to 5)
```

When we compare reference types, only the references are compared:

```java
Cat mittens = new Cat();
Cat fluffy = mittens;
boolean b = mittens == fluffy;        // true ('mittens' and 'fluffy' reference the same instance)
fluffy = new Cat();
b = mittens == fluffy;                // false ('mittens' and 'fluffy' reference different instances)
```

Above, it doesn't matter if two Cat instances have the same field values: a `==` comparing two Cats only returns `true` if both Cats are one and the same instance. To check if the fields of two instances all equal each other, we have to check field-by-field:

```java
boolean equalAge = mittens.age == fluffy.age;
boolean equalWeight = mittens.weight == fluffy.weight;
boolean equalName = mittens.name == fluffy.name;
// ... etc.
```

## the *main* method

Any public class may contain a public, static method called *main*. This method must take a `String` array as input and return `void`. When we run a Java program, we specify a class whose *main* we wish to invoke to kick off execution.