
## wrapper types

The `java.lang` package contains eight classes corresponding to the eight primitive types:

```
java.lang.Integer                 (int)
java.lang.Short                   (short)
java.lang.Long                    (long)
java.lang.Byte                    (byte)
java.lang.Character               (char)
java.lang.Float                   (float)
java.lang.Double                  (double)
java.lang.Boolean                 (boolean)
```

Instances of these types simply store a single value of their respective primitive types. We can retrieve the primtive values with methods:

```java
Integer i = new Integer(4);          // an instance of Integer storing the int value 4
Boolean b = new Boolean(true);       // an instance of Boolean storing the boolean value true
int x = i.intValue();                // 4
boolean y = b.booleanValue();        // true
```

One reason to use wrapper types is that (like any other reference types) they are subtypes of *Object*:

```java
Object[] objects = new Object[4];
objects[0] = new Float(53.29);       // an Object array cannot store a float primitive, but it can store a Float instance
```

As a special convenience, we can use a primitive in place of its wrapper type and *vice versa*. The Java compiler will implicitly create wrapper instances and retrieve primitive values from wrappers:

```java
Integer i = 4;               // Integer i = new Integer(4);
int j = i;                   // int j = i.intValue();
Integer k = i + j;           // Integer k = new Integer(i.intValue() + j);
Object o = 5;                // Object o = new Integer(5);
j = o;                       // compile error: cannot implicitly get primitive from Object, even if it references an Integer
j = (Integer) o;             // ok
```