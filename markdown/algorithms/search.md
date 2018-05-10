# search algorithms

Given a list of values, we often want to determine if a value is present in the list and, if so, determine its index.

## linear search

The obvious way to find a value in a list (and the only solution that works for any kind of list) is a ***linear search***, in which we iterate through all of the values until a match is found; if the list is exhausted with no match found, the value must not be present in the list:

```javascript
// Return the index of the array 'arr' where 'val' is found
// Return null if the value is not in the array
function linearSearch(arr, val) {
    for (var i in arr) {
        if (arr[i] === val) {
            return i;
        }
    }
    return null;
}

var a = [8, -11, 26, "yo", -11, 82];
var b = linearSearch(a, -11);          // 1
var c = linearSearch(a, "yo");         // 3    
var d = linearSearch(a, "bonjour");    // null
```

If the value we search for occurs more than once, we get just the index of its first occurrence.

Unfortunately, there is no faster, more efficient way to search for values in any possible list. For small lists, this is usually not a concern on modern computers, but the larger the list, the more work it takes to search through the whole thing.

As we'll see in later lessons, if we're willing to first translate our list into a different data structure, we can then search for values in the new structure more efficiently. Transforming the whole list is expensive, but then finding values becomes much cheaper.

## binary search

For the special case where a list is sorted, we can use the ***binary search*** algorithm. 

A sorted list has all the values ordered based on some criteria. Numbers are usually ordered with lesser values before greater values (in 'ascending' order) *or* with greater values before lesser values (in 'descending' order). Strings are generally ordered alphabetically, A to Z (ascending) or Z to A (descending). Whatever the criteria, it must apply to all values of the list: given any two unequal values in the list, one comes before the other. Generally then, a sorted list contains values of the same type. Here's an ascending list of numbers:

```
-11 2 52 89 300 545 716
```

Say we're searching for a value in this list, and say we look at a random index:

 - if we get lucky, the value at the index matches what we're searching for, and so we can stop looking
 - otherwise, if the value at the index is *less* than the value we're searching for, we know the value we're searching for can only be to the *right*
 - otherwise, if the value at the index is *greater* than the value we're searching for, we know the value we're searching for can only be to the *left*

So once we look at one value, we either find what we're looking for, or we eliminate from consideration all indexes to the left or right. Having eliminated indexes from consideration, we now have a smaller list to search through, and so we can repeat the process, picking a new random index in the smaller range. Repeat this process enough times and we eventually find our value or exhaust the list.

A binary search works just like this, but instead of picking indexes at random, it always picks the index in the middle of the remaining range. Effectively, each time we examine an index, we cut the remaining search range in half. Random indexes require fewer steps in the best-case scenario but require more steps in the worst-case scenario. We generally prefer the consistency of binary search.

```javascript

// Return the index of the array 'arr' where 'val' is found
// Return null if the value is not in the array
// (Assumes an ascending ordered array of numbers)
function binarySearch(arr, val) {
    var start = 0;
    var end = arr.length;    // end is always one past the last index
    while (start < end) {
        // we must round because the remaining range may have an odd number of elements
        var mid = Math.floor((end - start) / 2) + start;
        if (arr[mid] === val) {
            return mid;
        } else if (arr[mid] < val) {
            start = mid + 1;
        } else {    // arr[mid] > val
            end = mid;
        }
    }
    return null;
}

var a = [8, -11, 26, "yo", -11, 82];
var b = binarySearch(a, -11);          // 1
var c = binarySearch(a, "yo");         // 3    
var d = binarySearch(a, "bonjour");    // null
```

If the value we search for occurs more than once, we get the index of just one occurrence, and not necessarily the first.