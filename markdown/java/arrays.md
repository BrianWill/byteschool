# Java arrays

Unlike arrays in Go, the size is not integral to the type, *e.g.* an array of 7 ints is the same type as an array of 4 ints.

Like classes, interfaces, and enums, Java considers arrays to be 'reference types', meaning an array variable stores just a reference, not an array itself. To denote an array variable, `[]` *follows* the type:

```java
int[] ints;               // variable 'ints' stores a reference to an array of ints
String[] strings;         // variable 'strings' stores a reference to an array of strings
```

To create an actual array, we use the `new` operator and specify a size inside `[]`. The size can be a run time expression. The values in an array of a primitive type default to zero; the references in an array of a reference type default to `null`:

```java
int[] ints = new int[5];                 // assign to 'ints' a reference to a new array of 5 ints; the 5 values default to 0
ints = new int[3];                       // assign to 'ints' a reference to a new array of 3 ints; the 3 values default to 0
int i = 11;
String[] strings = new String[i - 4];    // assign to 'strings' a reference to a new array of 7 String references; the 7 references default to null
```

An array of a primitive type stores the values directly, *e.g.* an array of 5 ints stores 5 ints directly. In contrast, an array of a reference type stores references, not values directly:

```java
Cat[] cats = new Cat[3];
cats[0] = new Cat();           // index 0 now references a new Cat
cats[1] = cats[0];             // index 1 now references the same Cat as index 0
cats[2] = cats[0];             // index 2 now references the same Cat as index 0
```

We can create arrays of arrays:

```java
int[][] ints = new int[5][];    // assign to 'ints' a reference to a new array of 5 int arrays; the 5 values default to null
ints[0] = new int[11];          // index 0 now references a new array of 11 ints
ints[1] = ints[0];              // index 1 now references the same array as index 0
ints[1] = ints[3];              // index 1 now null
ints[4] = new int[7];           // index 4 now references a new array of 7 ints
```

We can create arrays of any dimension (though arrays of 3 dimensions or more are not commonly useful):

```java
int[][][] ints = new int[5][][];
ints[0] = new int[11][];            // index 0 now references a new array of 11 arrays of ints
ints[4] = new int[7][];             // index 4 now references a new array of 11 arrays of ints
```

No matter how many dimensions, a multi-dimensional array is always a contiguous list of references to other arrays. This is different from Go, where an array of arrays contains the 'subarrays' directly, *e.g.* a Go array of 3 arrays of 6 ints stores 18 ints. A Java array of 3 arrays of ints is just 3 references, and the 'subarrays' it might reference may be any size and are stored elsewhere in memory.

As a convenience, if we specify sizes for the 'subarray' dimensions when creating a multi-dimension array, Java will create subarrays of uniform size:

```java
int[][] ints = new int[5][12];       // create subarrays of size 12
```

The below is equivalent:

```java
int[][] ints = new int[5][];       
ints[0] = new int[12];
ints[1] = new int[12];
ints[2] = new int[12];
ints[3] = new int[12];
ints[4] = new int[12];
```

All arrays of any type and dimension are considered subtypes of `Object`:

```java
Object o = new String[3];
String s = (String) o[1];                // downcast required!
```

Moreover, if X is a subtype of Y, then an n-dimension array of X is a subtype of an n-dimension array of Y:

```java
// assume Cat is a subtype of Mammal
Mammal[] mammals = new Cat[3];
Mammal m = mammals[0];                   
Cat c = (Cat) mammals[0];                // downcast required!
```

[arrays are covariant, but generics are not]

[TODO initializing arrays with {}]