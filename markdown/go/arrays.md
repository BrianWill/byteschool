# Go arrays

An array is a value made up of multiple values of the same type:

```
var foo [3]int         // variable 'foo' stores an array of 3 ints
```

Each element of the array is known by its numeric index. The first element is at index 0, the second at index 1, *etc.* The last element's index is effectively always one less than the length of the array:

```
var foo [3]int         
foo[2] = 57            // assign 57 to the last index of foo
```

When we create an array, the size must be a constant expression (meaning it can't include variables or function calls). When indexing an array, however, we can use a runtime integer expression. 

```
var foo [5 + 2]int    // variable 'foo' stores an array of 7 ints
idx := 3
foo[idx] = 9          // assign 9 to index 3 of the array
var bar [idx]int      // compile error: array index must be a constant expression
```

Accessing an index out of bounds with a constant expression triggers a compile error. Accessing an index out of bounds with a runtime expression triggers a *panic* (a runtime error, discussed later):

```
var foo [5]int
foo[26] = 9           // compile error: index out of bounds            
```

Assigning one array to another copies all the elements by their respective indexes. An array variable can only be assigned arrays of the same type and size:

```
var foo [3]int
foo[0] = 7
foo[1] = 80
foo[2] = 23

var bar [3]int
bar = foo           // bar[0] = foo[0]; bar[1] = foo[1]; bar[2] = foo[2]

var ack [8]int
ack = foo           // compile error: cannot assign [3]int to [8]int
```

We can also compare arrays of the same type and size with `==`. The equality test returns `true` if all of the respective elements are equal:

```
var foo [3]int
var bar [3]int
b := foo == bar           // b := (foo[0] == bar[0]) && (foo[1] == bar[1]) && (foo[2] == bar[2])
```

We can create an array value using `{}`, similar to how we create struct values:

```
var foo [3]int = [3]int{5, 2, 1}    // the number of elements in the {} must be no greater than the specified size
foo := [3]int{5, 2, 1}              // equivalent to previous line
```

The elements of an array variable default to their zero value:

```
var foo [3]int
a := foo[1]         // 0

var bar [5]string
b := bar[1]         // "" (empty string)
```

Functions can take arrays as inputs and return arrays as output:

```
// returns the sum of all values in the array
func sum(nums [10]int) int {
    val := 0
    for i := 0; i < 10; i++ {
        val = val + nums[i]
    }
    return val
}

arr := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
a := sum(arr)      // 55
```

Be clear that when *sum* is called, the whole array argument is copied to the array parameter. The argument variable and parameter variable are separate arrays, each made up of 10 int values.
