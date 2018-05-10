# sort algorithms

Given a list and a criteria by which to order its values relative to each other, we can sort the list. There are dozens of ways to sort a list, but we'll look here at a few of the more common algorithms.

## selection sort

A ***selection sort*** works by finding the smallest value in the unsorted list and moving it to a new, empty list. This repeats until all of the values have been moved. For example, given this unsorted list:

```
65 -73 9 120 841 40
```

...we first move `-73`, then `9`, then `40`, then `65`, then `120`, and lastly `841`, giving us a sorted list.

```javascript
// Removes smallest number value from the array.
// Returns the removed value.
function removeSmallest(arr) {
    if (arr.length === 0) {
        return null;
    }
    var min = arr[0];
    var idx = 0;
    for (var i in arr) {
        if (arr[i] < min) {
            min = arr[i];
            idx = i;
        }
    }
    arr.splice(idx, 1);
    return min;
}


// Returns a new ascending sorted array of all the values in arr.
// Removes all elements from arr.
function selectionSort(arr) {
    var sorted = [];
    while (arr.length > 0) {
        sorted.push(removeSmallest(arr));
    }
    return sorted;
}
```

Creating a whole separate array is a cost we can avoid by moving the values within the same original list:

```javascript
// Sorts the values (ascending) within the array.
function selectionSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        // find smallest value in range starting from 'i'
        var m = i;
        for (var j = i; j < arr.length; j++) {
            if (arr[j] < arr[m]) {
                m = j;
            }
        }

        // swap smallest value with index 'i'
        var min = arr[m];
        arr[m] = arr[i];
        arr[i] = min;
    }
}
```

With each iteration of the outer loop, the smallest values are moved in order to the front of the list.

## insertion sort

An ***insertion sort*** works by moving the values one-by-one into a new list, inserting each value into its sorted position relative to the already moved values. For example, given the unsorted list:

```
65 -73 9 120 841 40
```

...the ascending sorted list is constructed in six steps:

```
65                          (inserted 65)
-73 65                      (inserted -73)
-73 9 65                    (inserted 9)
-73 9 65 120                (inserted 120)
-73 9 65 120 841            (inserted 841)
-73 9 40 65 120 841         (inserted 40)
```

In code:

```javascript
// Returns a new ascending sorted array of all the values in 'arr'.
// The array 'arr' is unmodified.
function insertionSort(arr) {
    var sorted = [];
    for (var i in arr) {
        // find index at which to insert arr[i]
        for (var j = 0; j < sorted.length; j++) {
            if (arr[i] < sorted[j]) {
                break;
            }
        }
        
        // insert value into 'sorted' at index 'j'
        sorted.splice(j, 0, arr[i]);   
    }
    return sorted;
}
```

Creating a whole separate array is a cost we can avoid by moving the values within the same original list:

```javascript
// Returns a new ascending sorted array of all the values in 'arr'.
// The array 'arr' is unmodified.
function insertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var val = arr[i];

        // find index at which to insert arr[i]
        for (var j = 0; j < i; j++) {
            if (val < arr[j]) {
                break;
            }
        }

        // shift up the indexes 'i - 1 ' down through 'j'
        for (var k = i - 1; k >= j; k--) {
            arr[k + 1] = arr[k];
        }

        // insert the value into place
        arr[j] = val;
    }
}
```

## bubble sort

A ***bubble sort*** works by comparing adjacent values and swapping them into proper order:

- If we compare and swap all adjacent values from front to back, this puts the largest value in its proper position at the end.
- Repeating the process puts the second-largest value in its proper position second from the end.
- Repeating the process again puts the third-largest value in its proper position third from the end.
- And so on. Eventually all the values end up in their proper place.

For example, given this unsorted list:

```
841 120 65 40 9 -73 
```

...the first pass through the list compares (and potentially swaps) index 0 with 1, index 1 with 2, index 2 with 3, index 3 with 4, and then index 4 with 5, leaving us with:

```
120 65 40 9 -73 841
```

Now the largest value is in the last position. If we do a second pass, we get:

```
65 40 9 -73 120 841
```

...and now the second-largest value is in position. After a third pass, we get:

```
40 9 -73 65 120 841
```

...and now the third-largest value is in position. After a fourth pass, we get:

```
9 -73 40 65 120 841
```

...and now the fourth-largest value is in position. We must do one last pass to ensure the first two values are in proper order:

```
-73 9 40 65 120 841
```

So the number of passes required is one less than the length of the array.

```javascript
function bubbleSort(arr) {
    // do a pass for length of the array minus one
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

After each pass, one more element is in its proper position, so we don't need to compare it for swapping. Therefore the inner loop can iterate over one fewer element in each additional pass:

```javascript
function bubbleSort(arr) {
    // do a pass for length of the array minus one
    for (var i = 0; i < arr.length - 1; i++) {
        var nCompares = arr.length - 1 - i;        // compare one less value in each additional pass
        for (var j = 0; j < nCompares; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

In our example above, the starting list was entirely reversed from its sorted order, and so it took all five passes to sort the array. For arrays that are not entirely reversed, the number of passes required may be fewer than one less the length of the array:

```
65 40 -73 9 841 120             (starting array)
40 -73 9 65 120 841             (after first pass)
-73 9 40 65 120 841             (after second pass: the list is fully sorted!)
-73 9 40 65 120 841             (after third pass: no change)
-73 9 40 65 120 841             (after fourth pass: no change)
-73 9 40 65 120 841             (after fifth pass: no change)
```

How can bubble sort know when the list has been fully sorted so that it can stop doing more passes? Well once the list is fully sorted, the next pass will perform no swaps, so we know to stop if the last pass performed no swaps:

```javascript
function bubbleSort(arr) {
    // do a pass for length of the array minus one
    for (var i = 0; i < arr.length - 1; i++) {
        var nCompares = arr.length - 1 - i;        
        var swaps = false;
        for (var j = 0; j < nCompares; j++) {
            if (arr[j] > arr[j + 1]) {
                // swap
                var swaps = true;
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        if (!swaps) {
            return;     // if no swaps in this last pass, we're done
        }
    }
}
```

## merge sort

Given two sorted arrays, we can combine them into a single sorted array:

```javascript
// Return new sorted array containing all elements of sorted arrays 'a' and 'b'.
function merge(a, b) {
    var length = a.length + b.length;
    var sorted = [];
    var ia = 0;
    var ib = 0;
    for (var i = 0; i < length; i++) {
        if (ia < ia.length && (ib >= b.length || a[ia] < b[ib])) {
            sorted[i] = a[ia];
            ia++;
        } else {
            sorted[i] = b[ib];
            ib++;
        }
    }
}
```

If the two halves of an array are sorted independently, we can merge these sorted halves into a sorted whole in basically the same way:

```javascript
// Assumes 'arr' has two halves of equal size, both sorted.
// Merges both halves into a new array.
function merge(arr) {
    var sorted = [];
    var mid = arr.length / 2;
    var a = 0;
    var b = mid;    // we assume array length is even
    for (var i = 0; i < arr.length; i++) {
        if (a < mid && (b >= arr.length || arr[a] < arr[b])) {
            sorted[i] = arr[a];
            a++;
        } else {
            sorted[i] = arr[b];
            b++;
        }
    }
}
```

A ***merge sort*** sorts the two halves of an array independently and then merges the halves into a single sorted array. When sorting the two halves, we can use any sort algorithm, such as selection sort, insertion sort, bubble sort, or even merge sort itself applied recursively.

## quick sort

A ***quick sort*** works by first picking a random value from the list and then comparing all other values against this 'pivot': all values less than the pivot go to its left; all values greater than the pivot go to its right.

We then sort these left and right groups independently using any sort algorithm, such as selection sort, merge sort, or even quick sort itself applied recursively.

```javascript
function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    // it doesn't matter which index we pick as the pivot, so it might as well be the first
    var pivot = arr[0];
    var left = [];
    var right = [];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    left = quickSort(left);
    right = quickSort(right);
    
    return left.concat(pivot, right);
}
```