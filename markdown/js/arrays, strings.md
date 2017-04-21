# Javascript arrays, strings.md

## arrays

What Javascript calls an array is like what Pigeon calls a list. An array is created by listing zero or more values inside square brackets `[]`:

```javascript
var x = [7, 16, "hi", -9];      // as x (list 7 16 "hi" -9)  # a list with 4 values
var y = [];                     // as y (list)               # an empty list
```

We retrieve the value at an index using the `[]` operator after the array:

```javascript 
var x = [7, 16, "hi", -9];
var y = x[0];                // 7
var z = x[2];                // "hi"
```

We set the value at an index by assigning to `[]` used on an array:

```javascript
var x = [7, 16, "hi", -9];
var y = x[1];                // 16
x[1] = "yo";
y = x[1];                    // "yo"

We can get the length of the array with the dot operator:

```javascript
var x = [7, 16, "hi", -9];
var y = x.length;            // 4
```

Assigning to an index out of bounds grows the array. Indexes without values default to the special value `undefined`:

```javascript
var a = [];                  // a new, empty array
var b = a.length;            // 0
a[10] = "yo";
var c = a.length;            // 11
var d = a[7];                // undefined
var e = a[10];               // "yo"
```

## strings

Strings can be denoted in double-quote marks or single-quote marks. Each character is stored as a 16-bit unsigned integer. Like with arrays, we can get the length of a string with the dot operator:

```javascript
var x = "hello";       
var y = x.length;            // 5
```

The `[]` operator used on a string returns an individual character as a string:

```javascript
var x = "hello";
var y = x[0];                // "h"
```
