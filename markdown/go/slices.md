# Go slices

A ***slice*** value represents a subsection of an array. Each slice value has three components: a reference to an element within an array, a *length* (a number of elements), and a *capacity* (the count of elements from the referenced element through the end of the array.)

Given an array, we get a slice value representing a subsection of the array using `[:]` (the slice operator). We use `[]` on the slice to access the values of the array subsection that it represents:

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
s := arr[3:7]    // slice referencing index 3 of the array, with length 4 (because 7 - 3 is 4) and capacity 7 (because 10 - 3 is 7)
a := s[0]        // 40
b := s[1]        // 50
c := s[2]        // 60
d := s[3]        // 70
e := s[4]        // panic! out of bounds (index must be less than length)
```

In effect, a slice represents *length*-number of elements starting from the referenced element. (The capacity is needed for the *append* built-in function, discussed shortly.)

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
s := arr[3:7]
s[0] = -999
z := arr[3]       // -999
```

It's perfectly possible for a slice to start at the beginning of an array. In fact, a slice can represent the whole of an array:

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
s := arr[0:7]    // slice referencing index 0 of the array, with length 7 and capacity 10
s2 := arr[0:10]  // slice referencing index 0 of the array, with length 10 and capacity 10
```

Note that multiple slice values can represent overlapping subsections of the same array. Consequently, changes *via* one slice can affect other slices:

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
s := arr[4:9]    
s2 := arr[8:10]
s[4] = -999      
z := s2[0]       // -999
```

Slices are typed, *e.g.* an `int` slice is different from a `bool` slice which is different from a `string` slice, *etc.* A slice type is denoted `[]type` (just like an array, but the square brackets are left empty). The length and capacity of a slice is not part of its type, so we can assign a slice of any length or capacity to a slice variable:

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
var foo []int
foo = arr[2:5]
foo = arr[5:9]

var bar []string
bar = arr[2:7]     // compile error: cannot assign []int to []string variable
```

In a slice operation, we can omit the two numbers around the colon. If we omit the first number, it defaults to `0`; if we omit the second number, it defaults to the length of the array.

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
s := arr[:]       // same as arr[0:10]
s = arr[:10]      // same as arr[0:10]
s = arr[0:]       // same as arr[0:10]
```

We cannot create a slice from an array value directly:

```go
arr := [5]int{10, 20, 30, 40, 50}
s := arr[:]                             // ok
s = [5]int{10, 20, 30, 40, 50}[:]       // compile error
```

However, we can create a slice with a new underlying array by just leaving the square brackets in front empty:

```go
s := []int{10, 20, 30, 40, 50}          // create a slice referencing start of a new underlying array, with length 5 and capacity 5
```

We can use the slice operator to get a new slice from a slice. The new slice represents a subsection of the same array as the original:

```go
arr := [10]int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}
s := arr[2:8]       
s2 := s[3:5]        // same subsection as arr[5:7]
z := s2[0]          // 60
```

## built-in functions *len* and *cap*

Go has a dozen special ***built-in functions*** that aren't really functions but more like operators. These 'functions' do things which you could not write your own functions to do, so Go provides them for you.

The built-in function *len* ('length') returns the length of a slice:

```go
s := []int{1, 2, 3, 4}
z := len(s)    // 4
```

The built-in function *cap* ('capacity') returs the capacity of a slice:

```go
s := []int{1, 2, 3, 4}
z := cap(s)     // 4 (or possibly something greater!)
```

(For reasons discussed in a moment, Go may give a newly created slice a capacity larger than the minimum required to accomodate the length.)

## built-in function *make*

The built-in function *make* can be used to create a new array of any size and returns a slice of that array:

```go
// clearly make is not an ordinary function: it takes a type as its first argument!
var s []int := make([]int, 6, 13)
a := len(s)     // 6
b := cap(s)     // 13
```

Above, *make* creates an array of 13 ints and returns a slice of ints with a reference to the start of the array, a length of 6, and a capacity of 13.

Without *make*, we can only create arrays of sizes fixed at compile time. With *make*, we can create arrays with sizes determined at run time:

```go
s := make([]int, 6, foo())   // the size of the new array is whatever function 'foo' returns
```

## built-in function *append*

The built-in function *append* takes a slice and one or more values to append to the slice. If the slice has enough capacity after the end of its length to store the values, the values are assigned into the existing array, and a slice with a bigger length is returned:

```go
var arr [10]
s := arr[:5]               // len 5, cap 10
s = append(s, 46, 900, -70)
a := len(s)                // 8
b := cap(s)                // 10
c := s[5]                  // 46
d := s[6]                  // 900
e := s[7]                  // -70
f := s[8]                  // panic: index out of bounds
```

However, if there is not enough capacity at the end to store all of the new values, *append* will 

 1. create a new array that is big enough to store the existing slice values plus all the new values
 2. copy the values in the existing slice to the new array
 3. the new values are copied into the new array after the existing values
 4. return a slice referencing the first index of this new array, with the new length and capacity:

```go
var arr [6]
s := arr[:5]                 // len 5, cap 6
s = append(s, 46, 900, -70)
a := len(s)                  // 8
b := cap(s)                  // 8 (or possibly something greater!)
c := s[5]                    // 46
d := s[6]                    // 900
e := s[7]                    // -70
f := s[8]                    // panic: index out of bounds
```

When we append something to a slice, it's very common that we'll append more stuff to the slice soon thereafter. Because creating new arrays and copying elements is expensive, *append* will often create new arrays bigger than immediately necessary so as to avoid having to create new arrays in subsequent appends on the slice.

## built-in function *copy*

The built-in function *copy* copies elements of one slice to another slice of the same type. The returned value is the number of elements copied, which is equal to the shorter of the two lengths:

```go
foo := []int{10, 20, 30, 40, 50}
bar := make([]int, 3, 7)
i := copy(bar, foo)             // 3 (the number of elements copied)
a := bar[0]                     // 10
b := bar[1]                     // 20
c := bar[2]                     // 30
```

## slice zero values

The zero value of a slice is represented by the reserved word `nil`. A `nil` slice value references nothing and has a length and capacity of zero. Accesing elements of a `nil` slice triggers a panic, but we can append to a `nil` slice:

```go
var foo []int                // defaults to nil
foo = nil                    // assign nil to 'foo'
a := foo[0]                  // panic: index out of bounds
b := len(foo)                // 0
foo = append(foo, 8, 10)     // returns a slice with length 2 and a capacity of at least 2
```

(As we'll see shortly, the reserved word `nil` is also used to represent the zero value for some other types as well.)




