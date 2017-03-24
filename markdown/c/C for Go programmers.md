# C for Go programmers

Things C has that Go does as well (with some differences):

 - functions
 - global variables
 - structs
 - pointers
 - arrays
 - if, for, switch
 - goto
 - type casts
 - operators (some differences, but basically the same set)
 - `type` (in Go), `typedef` (in C)
 - a standard library (but C's is much smaller, fewer features)

Things Go has that C doesn't:

 - packages (in C, everything just goes into one big namespace!)
 - garbage collection (in C, must explicitly allocate and free memory)
 - built-in slices or maps (in C, must use library or write your own)
 - function values, variables (in C, use function pointers)
 - goroutines
 - channels
 - memory safety
 - nested functions and closures
 - panics
 - type inferrence, var, :=
 - interfaces
 - methods
 - embedded structs
 - multi-return
 - for-range
 - built-in string type (in C, just use arrays of bytes)
 - semi-colon insertion

 Things C has that Go doesn't:

 - pointer arithmetic
 - implicit casts
 - undefined behavior (Go has many fewer undefined behaviors)
 - declarations vs. definitions
 - unions
 - a preprocessor
 - while, do-while, register, volatile, static, sizeof, restrict, inline, void

## history

