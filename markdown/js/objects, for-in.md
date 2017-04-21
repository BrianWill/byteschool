# Javascript objects, `for-in`

## objects

What Javascript calls an ***object*** is a map of strings to other values. An object is created by listing zero or more key-value pairs inside `{}`:

```javascript
var a = {"fred": 3, "amy": 9, "rubber ducky": "hi"};     // an object with 3 key-value pairs
var b = {};                                              // an object with no key-value pairs
```

We access the values of keys using `[]` with a string inside. Accessing a non-existent key returns `undefined`:

```javascript
var a = {"fred": 3, "amy": 9, "rubber ducky": "hi"};
var b = a["fred"];                                       // 3
var c = a["amy"];                                        // 9
var d = a["rubber ducky"];                               // "hi"
var e = a["rumpelstiltskin"];                            // undefined
```

Assigning a value to an existing key changes the value associated with that key. Assigning to a non-existent key creates a new key-value pair:

```javascript 
a["fred"] = 7;                                           // set value of key "fred" to 7
a["rumpelstiltskin"] = "yo";                             // create new key-value pair
```

A *property* is an object key which resembles a variable (in that it consists of just letters of the alphabet, numerals, and underscores). As a convenience, we can omit quote marks around property names when creating an object, and we can use the `.` operator instead of `[]` when accessing properties:

```javascript
// the key "rubber ducky" is not a property because it contains a space
var a = {fred: 3, amy: 9, "rubber ducky": "hi"};
var b = a.fred;                                          // 3
var c = a.amy;                                           // 9
var d = a["rubber ducky"];                               // "hi"
var e = a.rumpelstiltskin;                               // undefined
a.rumpelstiltskin = "yo";                                // create new key-value pair
```

## for-in statements

A `for-in` loop iterates over the indexes of an array:

```javascript
var x = [10, 20, 30, 40, 50];
var y = [];
// copy every element of 'x' to 'y'
for (var i in arr) {
    y[i] = x[i];         // 'i' is the index, not the value!
}
```

A `for-in` loop can also iterate over the keys of an object. No guarantee is made about the order in which `for-in` will go through the keys:

```javascript
var obj = {amber: 2, brandy: 9, todd: 5};
var arr = [];
// add every key of 'obj' to 'arr'
for (var k in obj) {
    arr[arr.length] = k;
}
var a = arr;       // ["amber", "brandy", "todd"]      (the order might be different!)
```
