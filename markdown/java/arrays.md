# Java arrays

Unlike an array in Javascript, an array in Java is homogenous (meaning it only stores values of one kind) and fixed in size. If we create an array of 7 `int`'s, that array can only ever store `int'`s, and always seven of them. (As we'll see later, lists that can grow in size are provided by some classes in the standard library.)

The type of an array variable is denoted `type[]`. Arrays are reference types, so any array variable stores a reference to an array:

```java
int[] arr;                    // a variable 'arr' that stores a reference to an int array
String[] strings;             // a variable 'strings' that stores a reference to a String array
```

To create an actual array, we use the `new` operator followed by the array type with integer expression denoting the size in the square brackets:

```java
int[] arr;
arr = new int[5];             // create a new array of 5 ints and assign it to 'arr'
String[] strings;      
strings = new int[11];        // create a new array of 11 Strings and assign it to 'strings'
```

Just like a primitive variable, an array of a primitive types stores values directly, *e.g.* when we assign an `int` to an index of an `int` array, the value is copied into the array. 

Likewise, an array of a reference type stores references, *e.g.* when we assign a String to an index of a String array, the address of the String is copied into the array.

We access the indexes of an array with `[]`, just like in Javascript. Accessing indexes out of bounds throws an exception. Assigning values of the wrong type throws an exception:

```java
int[] arr = new int[5];
arr[2] = 100;
arr[4] = 80;
int x = arr[2];               // 100
arr[5] = 70;                  // exception: index 5 is out of bounds
arr[-1] = 2;                  // exception: index -1 is out of bounds
arr[1] = "hello";             // exception: "hello" is not an int
```

By default, the values of an array start out as zeroes (for number primitives), false (for booleans), or null (for any reference type). We can, however, optionally use `{}` to specify initial values when we create an array:

```java
int[] arr = new int[5]{7, 92, 561, -32, 0};      // create an int array with the initial values 
```

This is not any more effecient than assigning the values individually after creating the array, but it is sometimes more convenient and makes the code look neater.

Every array has a length property:

```java
int[] arr = new int[8];
int x = arr.length;                // 8
```

## arrays of arrays

We can create arrays of arrays:

```java
int[][] arr = new int[5][];        // assign to 'arr' a reference to a new array of 5 int arrays; the 5 values default to null
arr[0] = new int[11];              // index 0 now references a new array of 11 ints
arr[1] = arr[0];                   // index 1 now references the same array as index 0
arr[1] = arr[3];                   // index 1 now null
arr[4] = new int[7];               // index 4 now references a new array of 7 ints
```

We can create arrays of any dimension (though arrays of 3 dimensions or more are not commonly useful):

```java
int[][][] arr = new int[5][][];
arr[0] = new int[11][];            // index 0 now references a new array of 11 arrays of ints
arr[4] = new int[7][];             // index 4 now references a new array of 11 arrays of ints
```

No matter how many dimensions, a multi-dimensional array is always a contiguous list of references to other arrays. A Java array of 3 arrays of ints is just 3 references, and the 'subarrays' it might reference may be any size and are stored elsewhere in memory.

As a convenience, if we specify sizes for the 'subarray' dimensions when creating a multi-dimension array, Java will create subarrays of uniform size:

```java
int[][] arr = new int[5][12];       // create subarrays of size 12
```

The below is equivalent:

```java
int[][] arr = new int[5][];       
arr[0] = new int[12];
arr[1] = new int[12];
arr[2] = new int[12];
arr[3] = new int[12];
arr[4] = new int[12];
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